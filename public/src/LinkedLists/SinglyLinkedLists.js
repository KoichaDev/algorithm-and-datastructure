class SinglyLinkedLists {
	constructor(value) {
		this.head = {
			value: value,
			id: this.#createMemorySpaceAllocation(),
			nextNode: null,
		};

		this.length = 0;
	}

	insertNextNode(value) {
		const newNode = {
			value: value,
			id: this.#createMemorySpaceAllocation(),
			nextNode: null,
		};

		let currentNode = this.head;

		while (currentNode.nextNode !== null) {
			currentNode = currentNode.nextNode;
		}

		currentNode.nextNode = newNode;

		this.length++;

		return this;
	}

	insertTail(value) {
		const tailNode = {
			value: value,
			id: this.#createMemorySpaceAllocation(),
			nextNode: null,
		};

		let currentNode = this.head;

		while (currentNode.nextNode !== null) {
			currentNode = currentNode.nextNode;
		}

		currentNode.nextNode = tailNode;

		this.length++;
	}

	#createMemorySpaceAllocation(minValue = 1000, maxValue = 9999) {
		const min = minValue;
		const max = maxValue;
		const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		return randomNumber;
	}
}

const singlyLinkedLists = new SinglyLinkedLists(2);

singlyLinkedLists.insertNextNode(5).insertNextNode(10).insertNextNode(20);

singlyLinkedLists.insertTail(999);

console.log(singlyLinkedLists);
