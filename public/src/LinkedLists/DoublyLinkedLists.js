class DoublyLinkedLists {
	constructor(value) {
		this.head = this.#createNewNode(value);
		this.tail = this.head;

		this._nodeCollections = {};
		this.length = 0;
	}

	prependNode(value) {
		const newNode = this.#createNewNode(value);
		const currentNode = this.head;

		if (newNode.prevNode === null) {
			this.head = newNode;
			this.head.nextNode = currentNode;
		} else {
			this.head = newNode;
			this.head.nextNode = currentNode;
		}

		this.length++;
	}

	appendNode(value) {
		const newNode = this.#createNewNode(value);

		// linking previous Node before adding new next Node
		newNode.prevNode = this.tail;

		// after "linking" to the previous Node, it's time to take the
		// new node and add it on the new Node "chain" based how many times
		// we want to append new node
		this.tail.nextNode = newNode;
		this.tail = newNode;

		this.length++;

		return this;
	}

	removeNode(index) {
		const prevNode = this.#traverseNode(index - 1);
		const afterNode = this.#traverseNode(index + 1);

		prevNode.nextNode = afterNode;
		this.length--;
	}

	insertBeforeNode(index, value) {
		const newNode = this.#createNewNode(value);

		const prevNode = this.#traverseNode(index - 1);
		const afterNode = this.#traverseNode(index + 1);

		prevNode.nextNode = newNode;
		newNode.nextNode = afterNode;
		newNode.prevNode = prevNode;

		this.length++;
	}

	insertAfterNode(index, value) {
		const newNode = this.#createNewNode(value);

		const beforeNode = this.#traverseNode(index - 1);
		const currentNode = this.#traverseNode(index);
		const afterNode = this.#traverseNode(index + 1);

		currentNode.nextNode = newNode;
		newNode.nextNode = afterNode;
		newNode.prevNode = beforeNode;
		this.length++;
	}

	lookUpByIndexNode(index) {
		let currentNode = this.head;
		let count = 0;

		while (currentNode !== null) {
			if (index === count) {
				return currentNode;
			}

			currentNode = currentNode.nextNode;
			count++;
		}

		return null;
	}

	reverseNodes() {
		let currentLength = this.length;
		let count = 0;

		while (currentLength >= 0) {
			const reversedNode = this.#traverseNode(currentLength);

			this._nodeCollections[count] = reversedNode;

			count++;
			currentLength--;
		}
	}

	traverseNode(index, traverseReversed = false) {
		let count = 0;
		let currentNode = this.head;

		if (!traverseReversed) {
			while (count !== index) {
				currentNode = currentNode.nextNode;
				count++;
			}
		}

		return currentNode;
	}

	#traverseNode(index, traverseReversed = false) {
		let count = 0;
		let currentNode = this.head;

		if (!traverseReversed) {
			while (count !== index) {
				currentNode = currentNode.nextNode;
				count++;
			}
		}

		return currentNode;
	}

	#createNewNode(value) {
		return {
			value: value,
			nextNode: null,
			prevNode: null,
		};
	}
}

const doublyLinkedLists = new DoublyLinkedLists(1);

doublyLinkedLists.appendNode(2);
doublyLinkedLists.appendNode(3);
doublyLinkedLists.appendNode(4);
doublyLinkedLists.appendNode(5);

doublyLinkedLists.reverseNodes();

// doublyLinkedLists.removeNode(1);

// doublyLinkedLists.prependNode(9999);

// doublyLinkedLists.insert(5, 20);
// doublyLinkedLists.delete(3);

// doublyLinkedLists.getReverseNodeCollections();

const x = doublyLinkedLists.traverseNode(4)

console.log(x);

console.log(doublyLinkedLists);
