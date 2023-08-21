class SinglyLinkedLists {
	constructor(value) {
		this.head = this.#createNewNode(value);

		this.tail = this.head; // Initialize tail to head
		this.length = 0;
		this._nodeCollections = {};
	}

	prependNode(value) {
		const currentNode = this.head;
	}

	appendNode(value) {
		this.length++;

		const newNode = this.#createNewNode(value);

		this.#appendNextNode(newNode);
		this.#appendNewTailNode(newNode);
		this.#appendNewNodeCollections(newNode);

		return this;
	}

	#appendNewNodeCollections(newNode) {
		this._nodeCollections[this.length] = newNode;
	}

	#appendNextNode(newNode) {
		this.tail.nextNode = newNode;
	}

	#appendNewTailNode(newNode) {
		this.tail = newNode;
	}

	#createNewNode(value) {
		return {
			id: this.#createMemorySpaceAllocation(),
			value: value,
			nextNode: null,
			length: this.length ?? 0,
		};
	}

	#createMemorySpaceAllocation(minValue = 1000, maxValue = 9999) {
		const min = minValue;
		const max = maxValue;
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	}
}

const singlyLinkedLists = new SinglyLinkedLists(2);

singlyLinkedLists.appendNode(5);
singlyLinkedLists.appendNode(51).appendNode(100);

console.log(singlyLinkedLists);
