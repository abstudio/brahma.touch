    
	Brahma.component("touch", {
		config: {
			minMoveX: 1, // Min X distance to start listen touchmove
			minMoveY: 1, // Min Y distance to start listen touchmove
			simpleMoves: false, // Disable listen touchmove after first wipe action
			preventDefaultEvents: true // Prevent default events
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
			 if(component.config.preventDefaultEvents) {
				 e.preventDefault();
			 }

			 if(this.isMoving) {

			 	 if (component.config.simpleMoves) component.cancelTouch();
				 var x = e.touches[0].pageX;
				 var y = e.touches[0].pageY;
				 var dx = this.startX - x;
				 var dy = this.startY - y;
				 if(Math.abs(dx) >= component.config.minMoveX) {
					
					if(dx >= 0) {
						
						component.trigger('wipeLeft', [{
							dX: dx,
							dY: dy
						}]);
						
					}
					else {

						component.trigger('wipeRight', [{
							dX: dx,
							dY: dy
						}]);
						
					}


				 }
				 else if(Math.abs(dy) >= component.config.minMoveY) {
						
						if(dy >= 0) {
							component.trigger('wipeDown',[{
								dX: dx,
								dY: dy
							}]);
						}
						else {
							component.trigger('wipeUp',[{
								dX: dx,
								dY: dy
							}]);
						}
				};
				component.trigger('wipe', [{
					dX: dx,
					dY: dy
				}]);
			 }
		},
		onTouchStart : function(e)
		{
			var component = this;
				
				this.startX = e.touches[0].pageX;
				this.startY = e.touches[0].pageY;
				this.isMoving = true;
				this.selector[0].addEventListener('touchmove', function(e) {

					component.onTouchMove(e);
				}, false);


			
		}    	 

	}).execute = function() {
		var component = this;
		
		
		
		this.selector[0].addEventListener('touchstart', function(e) {
			if (component.preventDefaultEvents) e.preventDefault();
			component.onTouchStart(e);
		}, false);
		this.selector[0].addEventListener('touchend', function(e) {
			component.trigger("throw");

			if (component.preventDefaultEvents) e.preventDefault();
			component.cancelTouch();
		}, false);
		

		return this;
	};