    
	Brahma.component("touch", {
		minMoveX: 20,
		minMoveY: 20,
		preventDefaultEvents: true
	}).execute = function() {
		var component = this;
		
		this.each(function() {
			 var startX;
			 var startY;
			 var isMoving = false;

			 function cancelTouch() {
				 this.removeEventListener('touchmove', onTouchMove);
				 startX = null;
				 isMoving = false;
			 }	
			 
			 function onTouchMove(e) {
				 if(component.config.preventDefaultEvents) {
					 e.preventDefault();
				 }
				 if(isMoving) {
					 var x = e.touches[0].pageX;
					 var y = e.touches[0].pageY;
					 var dx = startX - x;
					 var dy = startY - y;
					 if(Math.abs(dx) >= component.config.minMoveX) {
						cancelTouch();
						if(dx > 0) {
							component.trigger('wipeleft');
							
						}
						else {
							component.trigger('wiperight');
							
						}
					 }
					 else if(Math.abs(dy) >= component.config.minMoveY) {
							cancelTouch();
							if(dy > 0) {
								component.trigger('wipedown');
							}
							else {
								component.trigger('wipeup');
							}
						 }
				 }
			 }
			 
			 function onTouchStart(e)
			 {
				 if (e.touches.length == 1) {
					 startX = e.touches[0].pageX;
					 startY = e.touches[0].pageY;
					 isMoving = true;
					 this.addEventListener('touchmove', onTouchMove, false);
				 }
			 }    	 
			 if ('ontouchstart' in document.documentElement) {
				 this.addEventListener('touchstart', onTouchStart, false);
			 }
		 });

		 return this;
	};