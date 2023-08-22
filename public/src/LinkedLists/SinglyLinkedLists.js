class SinglyLinkedLists {
	constructor(value) {
		this.head = this.#createNewNode(value);
		this.tail = this.head;
		this.length = 0;

		this.nodeCollections = {};
	}

	prependNode(value) {
		const newNode = this.#createNewNode(value);

		newNode.nextNode = this.head;
		this.head = newNode;
		this.length++;
	}

	appendNode(value) {
		const newNode = this.#createNewNode(value);

		this.tail.nextNode = newNode;
		this.tail = newNode;
		this.length++;
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

	delete(index) {
		const prevTraversedIndex = this.#traverseToIndex(index - 1);
		const reconnectTraversedToIndex = this.#traverseToIndex(index + 1);
		prevTraversedIndex.nextNode = reconnectTraversedToIndex;
		this.length--;
	}

	insert(index, value) {
		const prevIndexPosition = index - 1;

		const prevTraversedIndex = this.#traverseToIndex(prevIndexPosition);
		const currentTraversedIndex = this.#traverseToIndex(index);

		const newNode = this.#createNewNode(value);

		prevTraversedIndex.nextNode = newNode;

		newNode.nextNode = currentTraversedIndex;
	}

	getReverseNodeCollections() {
		let currentLength = this.length;
		let reversedIndex = 0;

		while (currentLength >= 0) {
			const reversedNode = this.#traverseToIndex(currentLength);

			this.nodeCollections[reversedIndex] = reversedNode.value;

			reversedIndex++;
			currentLength--;
		}

		return this.nodeCollections;
	}

	#createNewNode(value) {
		return {
			value: value,
			nextNode: null,
		};
	}

	#traverseToIndex(index) {
		let count = 0;
		let currentNode = this.head;

		while (count !== index) {
			currentNode = currentNode.nextNode;
			count++;
		}

		return currentNode;
	}
}

const singlyLinkedLists = new SinglyLinkedLists(1);

singlyLinkedLists.appendNode(2);
singlyLinkedLists.appendNode(3);
singlyLinkedLists.appendNode(4);
singlyLinkedLists.appendNode(5);

// singlyLinkedLists.prependNode(9);
// singlyLinkedLists.insert(5, 20);
// singlyLinkedLists.delete(3);

singlyLinkedLists.getReverseNodeCollections();

console.log(singlyLinkedLists);
