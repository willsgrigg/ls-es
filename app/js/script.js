const customers = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers')) : {};

let Customers = new Model('customers', customers);

bindEventListeners();

function bindEventListeners() {
	Customers.on('created', function (event) {
		updateEventsContent(event);
	});

	Customers.on('updated', function (event) {
		var node = document.createElement('p');
		var textnode = document.createTextNode(JSON.stringify(event));
		node.appendChild(textnode);
		document.getElementById('events').appendChild(node);
	});

	Customers.on('deleted', function (event) {
		throw new Error("This shouldn't happen");
	});
}

preExisting = Customers.all();
for (var event in preExisting) {
    if (!preExisting.hasOwnProperty(event)) continue;

    for(var i = 0; i < preExisting[event].length; i++) {
    	updateEventsContent(preExisting[event][i]);
    }    
}

function updateEventsContent(event) {
	var node = document.createElement('p');
	var textnode = document.createTextNode(JSON.stringify(event));
	node.appendChild(textnode);
	document.getElementById('events').appendChild(node);
}