# ls-es
Simple local storage event store, obviously not real world just an experiment

### local setup
`npm install` followed by `gulp` will get you up and running

### using it
This is just an expirement with all the interaction happening in the console

The main meat of this is `model.js` which should be extended with models that you want to create, this can be given a name and an existing data set from a store such as local storage

Methods
 - `Model.all()` get all your events
 - `Model.all('stream')` get all events for a stream
 - `Model.current('stream')` get the current state of a stream
 - `Model.add('stream', 'event', { key: value })` add event to stream
 
Event handlers
 - `Model.on('event', function (event) { })`
 - These will bind to event keys used in the second argument of `add()`
