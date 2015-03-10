
Brahma.application("touch", {
	config: {
		minMoveX: 5, // Min X distance to start listen touchmove
		minMoveY: 5, // Min Y distance to start listen touchmove
		simpleMoves: false, // Disable listen touchmove after first wipe action
		preventDefaults: true, // Prevent default events
		preventDefaultsFunction: function() { // Now you can control prevent default by this function
			return (this.config.preventDefaults);
		}
	},
	startX: null,
	isMoving: null,
	cancelTouch: function() {
		var component = this;
		 this.selector[0].removeEventListener('touchmove', function(e) {
		 	component.onTouchMove(e)
		 });
		 this.startX = null;
		 this.isMoving = false;
	},
	onTouchMove : function(e) {
		
		var component = this;
		 

		 if(this.isMoving) {

		 	 
			 var x = e.touches[0].pageX;
			 var y = e.touches[0].pageY;
			 var dx = this.startX - x;
			 var dy = this.startY - y;

			 
			var that = this;
			var checkVerticalSwipe = function() {
				if (!that.config.preventVerticalSwipe && Math.abs(dx)<Math.abs(dy)) {
			 		return true;
				}
				return false;
			};

			/* Событие свайп */
			component.trigger('wipe', [{
				dX: dx,
				dY: dy
			}]);
			
			if(Math.abs(dx) >= component.config.minMoveX) {
				if (component.config.simpleMoves) component.cancelTouch();
				if(dx >= 0) {
					
					component.trigger('swipeLeft', [{
						dX: dx,
						dY: dy
					}]);
					
				}
				else {

					component.trigger('swipeRight', [{
						dX: dx,
						dY: dy
					}]);
					
				}
				return checkVerticalSwipe;
			 }
			 else if(Math.abs(dy) >= component.config.minMoveY) {
			 		
					if (component.config.simpleMoves) component.cancelTouch();
					if(dy >= 0) {
						component.trigger('swipeUp',[{
							dX: dx,
							dY: dy
						}]);
					}
					else {
						component.trigger('swipeDown',[{
							dX: dx,
							dY: dy
						}]);
					}
				return checkVerticalSwipe;
			} else {
					
				return checkVerticalSwipe;
			}
			
			return false;
		 }
	},
	onTouchStart : function(e)
	{
		
		var component = this;
		
			this.startX = e.touches[0].pageX;
			this.startY = e.touches[0].pageY;
			this.isMoving = true;

			this.selector[0].addEventListener('touchmove', function(e) {
				if (component.config.preventDefaults) e.preventDefault();
				//e.stopPropagation();
				component.onTouchMove(e);
			}, false);
	}

}).run = function() {
	var component = this;
	
	
	this.selector[0].addEventListener('touchstart', function(e) {
		
		if(component.config.preventDefaultsFunction.call(component, e)) {
			
			//e.preventDefault();
		}
		component.onTouchStart(e);
	}, false);
	this.selector[0].addEventListener('touchend', function(e) {
		component.trigger("throw", [e.target, e]);

		if(component.config.preventDefaultsFunction.call(component, e)) {
			//e.preventDefault();
		};
		component.cancelTouch();
	}, false);
	

	return this;
};