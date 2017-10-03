class Model {
	constructor(name, attributes, events) {
		this.name = name;
		this.attributes = attributes;
		this.events = events ? events : {};
		this.handlers = {};
	}

	all(stream) {
		if(stream) {
			return this.events[stream] || [];
		}

		return this.events || {};
	}

	current(stream) {
		if(!stream) {
			throw new Error('Current requires a stream to get.');
		}

		return this.all(stream).reduce((events, event) => {
			return Object.assign(events, event.payload);
		}, {});
	}

	add(stream, event, payload) {
		var e = {
			event: event,
			payload: payload,
			timestamp: Date.now()
		};

		this.store(stream, e);

		this.handle(e);
	}

	store(stream, event) {
		this.events[stream] = this.events[stream] || [];
		this.events[stream].push(event);

		localStorage.setItem(this.name, JSON.stringify(this.events));
	}

	handle(event) {
		var hs = this.handlers[event.event] || [];

		for (var i = 0; i < hs.length; i++) {
			hs[i](event);
		}
	}

	on(event, handler) {
		this.handlers[event] = this.handlers[event] || [];
		this.handlers[event].push(handler);
	}
}