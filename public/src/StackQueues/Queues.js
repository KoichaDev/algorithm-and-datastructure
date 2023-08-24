class Queues {
	constructor() {
		this.first = null;
		this.last = null;
		this.queues = {};
		this.length = 0;
	}

	peek() {
		return this.first;
	}

	enqueue(value) {
		const newNode = this.#createNewNode(value);

		if (this.length === 0) {
			this.first = newNode;
			this.last = newNode;
		} else {
			const referencePoint = newNode;
			this.last.nextNode = referencePoint;
			this.last = newNode;
		}

		this.queues[this.length] = newNode;

		this.length++;

		return this;
	}

	dequeue() {
		if (this.length === 0) {
			return null;
		}

		if (this.#isEmpty(this.first, this.last))
			if (this.first.nextNode === this.last.nextNode) {
				this.last = null;
			}

		// This effectively removes the first node from the queue and
		// makes the next node the new first node.
		this.first = this.first.nextNode;

		this.length--;
		return this;
	}

	#isEmpty(firstStack, secondStack) {
		return firstStack.nextNode === secondStack.nextNode;
	}
	#createNewNode(value) {
		return {
			value: value,
			nextNode: null,
		};
	}
}

const queues = new Queues();

queues.enqueue(1).enqueue(2).enqueue(3);
queues.dequeue().dequeue();

console.log(queues);
