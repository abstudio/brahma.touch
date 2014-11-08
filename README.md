brahma.touch
============

Support touch events for dom elements

## Usage
```javascript
Brahma('#myelement').component('touch')
.bind('wipeleft', function() {
  console.log('Wipe left!');
})
.bind('wiperight', function() {
  console.log('Wipe right!');
})
.bind('wipeup', function() {
  console.log('Wipe up!');
})
.bind('wipedown', function() {
  console.log('Wipe down!');
});
```
