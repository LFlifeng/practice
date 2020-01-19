var RENDERER = {
	RESIZE_INTERVAL : 30,
	STATIC_RADIUS : 10,
	DYNAMIC_RADIUS : 8,
	SPACE : 60,
	GRAVITY : 0.1,
	MAX_COUNT : 3,
	
	init : function(){
		this.setParameters();
		this.setup();
		this.reconstructMethods();
		this.bindEvent();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-particle-container');
		this.$canvas = $('<canvas />');
		this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
		this.staticParticles = [];
		this.dynamicParticles = [];
		this.resizeIds = [];
	},
	setup : function(){
		this.staticParticles.length = 0;
		this.dynamicParticles.length = 0;
		this.resizeIds.length = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.interval = this.getRandomValue(150, 300);
		this.$canvas.attr({width : this.width, height : this.height});
		this.maxCount = Math.ceil(this.width / 1000 * this.height / 1000 * this.MAX_COUNT);
		this.createParticles();
	},
	getRandomValue : function(min, max){
		return min + (max - min) * Math.random() | 0;
	},
	createParticles : function(){
		var columnCount = Math.floor(Math.ceil(this.width / this.SPACE) / 2) * 2 + 1,
			rowCount = Math.ceil(this.height / this.SPACE),
			columnOffset = ((columnCount - 1) * this.SPACE - this.width) / 2;
			
		for(var y = 0; y < rowCount; y++){
			for(var x = 0, count = columnCount + (y % 2 == 0 ? 0 : 1); x < count; x++){
				this.staticParticles.push(new STATIC_PARTICLE(this, x * this.SPACE - columnOffset - (y % 2 == 0 ? 0 : this.SPACE / 2), y * this.SPACE + this.SPACE, Math.round(360 * x / count)));
			}
		}
		this.dynamicParticles.push(new DYNAMIC_PARTICLE(this));
	},
	watchWindowSize : function(){
		while(this.resizeIds.length > 0){
			clearTimeout(this.resizeIds.pop());
		}
		this.tmpWidth = this.$window.width();
		this.tmpHeight = this.$window.height();
		this.resizeIds.push(setTimeout(this.jdugeToStopResize, this.RESIZE_INTERVAL));
	},
	jdugeToStopResize : function(){
		var width = this.$window.width(),
			height = this.$window.height(),
			stopped = (width == this.tmpWidth && height == this.tmpHeight);
			
		this.tmpWidth = width;
		this.tmpHeight = height;
		
		if(stopped){
			this.setup();
		}
	},
	reconstructMethods : function(){
		this.watchWindowSize = this.watchWindowSize.bind(this);
		this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
		this.render = this.render.bind(this);
	},
	bindEvent : function(){
		this.$window.on('resize', this.watchWindowSize);
	},
	checkCollision : function(){
		for(var i = 0; i < this.dynamicParticles.length; i++){
			var dynamicParticles = this.dynamicParticles[i];
			
			for(var j = 0; j < this.staticParticles.length; j++){
				dynamicParticles.checkCollision(this.staticParticles[j]);
			}
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		this.context.save();
		this.context.fillStyle = 'hsla(0, 0%, 0%, 0.3)';
		this.context.fillRect(0, 0, this.width, this.height);
		this.context.globalCompositeOperation = 'lighter';
		
		for(var i = 0, count = this.staticParticles.length; i < count; i++){
			this.staticParticles[i].render(this.context);
		}
		for(var i = 0, count = this.dynamicParticles.length; i < count; i++){
			this.dynamicParticles[i].render(this.context);
		}
		this.context.restore();
		this.checkCollision();
		
		if(this.dynamicParticles.length < this.maxCount){
			if(--this.interval == 0){
				this.interval = this.getRandomValue(150, 300);
				this.dynamicParticles.push(new DYNAMIC_PARTICLE(this));
			}
		}
	}
};
var STATIC_PARTICLE = function(renderer, x, y, hue){
	this.renderer = renderer;
	this.x = x;
	this.y = y;
	this.hue = hue;
	this.init();
};
STATIC_PARTICLE.prototype = {
	ADDITION_MAGINIFICATION : 5,
	DELTA_LUMINANCE : Math.PI / 100,
	DELTA_HUE : 0.2,
	
	init : function(){
		this.particles = [];
		this.theta = 0;
		this.hit = false;
	},
	collide : function(force){
		this.hit = true;
		
		for(var i = 0, count = force * this.ADDITION_MAGINIFICATION; i < count; i++){
			this.particles.push(new SPARKLER_PARTICLE(this.renderer, this));
		}
	},
	render : function(context){
		context.save();
		context.translate(this.x, this.y);
		
		var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.renderer.STATIC_RADIUS);
		gradient.addColorStop(0, 'hsl(' + this.hue + ', 70%, ' + (5 + 45 * Math.sin(this.theta)) + '%)');
		gradient.addColorStop(1, 'hsl(' + this.hue + ', 70%, ' + (2 + 10 * Math.sin(this.theta)) + '%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(0, 0, this.renderer.STATIC_RADIUS, 0, Math.PI * 2, false);
		context.fill();
		
		for(var i = this.particles.length - 1; i >= 0; i--){
			if(!this.particles[i].render(context)){
				this.particles.splice(i, 1);
			}
		}
		context.restore();
		
		if(this.hit || this.theta > 0){
			if(this.hit && this.theta > Math.PI / 2){
				this.theta = Math.PI - this.theta;
			}
			this.theta += this.DELTA_LUMINANCE;
			
			if(this.theta > Math.PI / 2){
				for(var i = 0, count = this.particles.length; i < count; i++){
					this.particles[i].activate();
				}
			}
			if(this.theta > Math.PI){
				this.theta = 0;
			}
			this.hit = false;
		}
		this.hue += this.DELTA_HUE;
		this.hue %= 360;
	}
};
var DYNAMIC_PARTICLE = function(renderer){
	this.renderer = renderer;
	this.init();
};
DYNAMIC_PARTICLE.prototype = {
	RESTITUTION : 0.9,
	
	init : function(){
		this.x = this.renderer.getRandomValue(this.renderer.width / 10, this.renderer.width * 9 / 10);
		this.y = -this.renderer.DYNAMIC_RADIUS;
		this.previousX = this.x;
		this.previousY = this.y;
		this.vx = this.renderer.getRandomValue(1, 3) * (Math.random() < 0.5 ? 1 : -1);
		this.vy = 0;
		this.ax = 0;
		this.ay = this.renderer.GRAVITY;
		this.hue = 210;
	},
	rotate : function(x, y, angle){
		var sin = Math.sin(angle),
			cos = Math.cos(angle);
		return {x : x * cos + y * sin, y : y * cos - x * sin};
	},
	checkCollision : function(staticParticle){
		var dx = staticParticle.x - this.x,
			dy = staticParticle.y - this.y,
			distance = Math.sqrt(dx * dx + dy * dy);
			
		if(distance > this.renderer.STATIC_RADIUS + this.renderer.DYNAMIC_RADIUS){
			return;
		}
		staticParticle.collide(Math.sqrt(this.vx * this.vx + this.vy * this.vy));
		this.hue = staticParticle.hue;
		
		var angle = Math.atan2(dy, dx),
			axis1 = {x : 0, y : 0},
			axis2 = this.rotate(dx, dy, angle),
			v1 = this.rotate(this.vx, this.vy, angle);
		v1.x *= -this.RESTITUTION;
		
		var vAbs = Math.abs(v1.x),
			overlap = (this.renderer.STATIC_RADIUS + this.renderer.DYNAMIC_RADIUS) - Math.abs(axis1.x - axis2.x);
			
		axis1.x += Math.abs(overlap * v1.x / vAbs) * (axis1.x >= axis2.x ? 1 : -1);
		axis1 = this.rotate(axis1.x, axis1.y, -angle);
		v1 = this.rotate(v1.x, v1.y, -angle);
		
		this.previousX = this.x;
		this.previousY = this.y;
		this.x += axis1.x;
		this.y += axis1.y;
		this.vx = v1.x;
		this.vy = v1.y;
	},
	render : function(context){
		context.save();
		context.translate(this.x, this.y);
		
		var gradient = context.createRadialGradient(0, 0, 0, 0, 0, this.renderer.DYNAMIC_RADIUS);
		gradient.addColorStop(0, 'hsl(' + this.hue + ', 80%, 60%)');
		gradient.addColorStop(1, 'hsl(' + this.hue + ', 80%, 10%)');
		context.fillStyle = gradient;
		context.beginPath();
		context.arc(0, 0, this.renderer.DYNAMIC_RADIUS, 0, Math.PI * 2, false);
		context.fill();
		context.restore();
		
		this.x += this.vx;
		this.y += this.vy;
		this.vy += this.ay;
		
		if(this.x < this.renderer.DYNAMIC_RADIUS || this.x > this.renderer.width + this.renderer.DYNAMIC_RADIUS || this.y > this.renderer.height + this.renderer.DYNAMIC_RADIUS){
			this.init();
		}
	}
};
var SPARKLER_PARTICLE = function(renderer, generator){
	this.renderer = renderer;
	this.generator = generator;
	this.init();
};
SPARKLER_PARTICLE.prototype = {
	RADIUS : 20,
	MAX_STROKE_COUNT : 8,
	MAX_VELOCITY : 3,
	MAX_OFFSET : 5,
	SCALE_RATE : 0.01,
	FRICTION : 0.99,
	
	init : function(){
		var velocity = this.renderer.getRandomValue(this.MAX_VELOCITY / 5, this.MAX_VELOCITY),
			theta = this.renderer.getRandomValue(0, Math.PI * 2),
			offset = this.renderer.getRandomValue(0, this.MAX_OFFSET);
			
		this.x = offset * Math.cos(theta);
		this.y = offset * Math.sin(theta);
		this.radius = this.RADIUS;
		this.strokeCount = Math.round(this.renderer.getRandomValue(4, this.MAX_STROKE_COUNT)) * 2;
		this.radian = Math.PI * 2 / this.strokeCount;
		this.vx = velocity * Math.cos(theta);
		this.vy = velocity * Math.sin(theta);
		this.theta = 0;
		this.scale = 1;
		this.active = false;
	},
	activate : function(){
		this.active = true;
	},
	render : function(context){
		if(!this.active){
			return true;
		}
		context.save();
		context.translate(this.x, this.y);
		context.scale(this.scale, this.scale);
		context.rotate(this.theta);
		
		if(Math.random() > 0.3){
			context.fillStyle = 'hsl(' + this.generator.hue + ', 60%, 30%)';
			context.beginPath();
			context.moveTo(0, -this.radius);
			
			for(var i = 0, count = this.strokeCount; i < count; i++){
				var radius = this.radius / ((i % 2 == 0) ? 1 : 5);
				context.lineTo(radius * Math.sin(this.radian * i), -radius * Math.cos(this.radian * i));
			}
			context.closePath();
			context.fill();
		}
		context.restore();
		
		this.x += this.vx;
		this.y += this.vy;
		this.vy += this.renderer.GRAVITY;
		this.vx *= this.FRICTION;
		this.vy *= this.FRICTION;
		this.scale -= this.SCALE_RATE;
		this.theta += Math.PI / 100 * this.vx;
		this.theta %= Math.PI * 2;
		
		return this.scale >= 0;
	}
};
$(function(){
	RENDERER.init();
});