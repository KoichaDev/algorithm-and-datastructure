class SinglyLinkedLists {
	constructor(value) {
		this.head = this.#createNewNode(value);
		this.tail = this.head; // this will be our reference to create nested nextNode
		this.length = 0;
	}

	prependNode(value) {
		const newNode = this.#createNewNode(value);

		newNode.nextNode = this.head;
		this.head = newNode;
		this.length++;
	}

	appendNode(value) {
		this.length++;

		const newNode = this.#createNewNode(value);

		this.tail.nextNode = newNode;
		this.tail = newNode;

		return this;
	}

	lookup(value) {
		let currentNode = this.head;

		while (currentNode !== null) {
			if (currentNode.value === value) {
				return currentNode.value;
			}

			currentNode = currentNode.nextNode;
		}

		return null;
	}

	#createNewNode(value) {
		return {
			value: value,
			nextNode: null,
		};
	}
}

const singlyLinkedLists = new SinglyLinkedLists(2);

singlyLinkedLists.appendNode(5);
singlyLinkedLists.appendNode(51).appendNode(100);

singlyLinkedLists.prependNode(9);

const result = singlyLinkedLists.lookup(51);

console.log(result);
