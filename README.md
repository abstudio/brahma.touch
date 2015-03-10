brahma.touch
============

Support touch events for dom elements

## Usage
```javascript
Brahma('#myelement').app('touch')
.bind('wipeLeft', function() {
  console.log('Wipe left!');
})
.bind('wipeRight', function() {
  console.log('Wipe right!');
})
.bind('wipeUp', function() {
  console.log('Wipe up!');
})
.bind('wipeDown', function() {
  console.log('Wipe down!');
})
.bind('wipe', function(e) {
  console.log(dX,dY);
  // dX - distance in X coord
  // dY - distance in Y coord
});
```
