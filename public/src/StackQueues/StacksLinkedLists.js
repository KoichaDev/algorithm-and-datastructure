class StacksLinkedLists {
	constructor() {
		this.top = null;
		this.bottom = null;
		this.stacks = {};
		this.length = 0;
	}

	peek() {
		return this.top;
	}

	push(value) {
		const newNode = this.#createNewNode(value);

		if (this.#isEmptyStack(this.top)) {
			this.top = newNode;
			this.bottom = newNode;
		} else {
			const referencePointer = this.top;
			this.top = newNode;
			this.top.prevNode = referencePointer;
		}

		this.stacks[this.length] = value;

		this.length++;

		return this;
	}

	pop() {
		if (this.#isEmptyStack(this.top)) {
			// Stack is empty, nothing to pop
			return null;
		}

		const currentNode = this.top;

		if (this.length === 1) {
			// If there's only one item in the stack, reset the stack
			this.top = null;
			this.bottom = null;
		} else {
			// Update the top node and remove the reference to the previous node
			this.top = currentNode.prevNode;
			currentNode.prevNode = null;
		}

		this.length--;

		delete this.stacks[this.length];

		return this;
	}

	#createNewNode(value) {
		return {
			value: value,
			prevNode: null,
		};
	}

	#isEmptyStack(stack) {
		return stack === null;
	}
}

const stacksLinkedLists = new StacksLinkedLists();

stacksLinkedLists.push('google').push('udemy').push('discord').push('linkedin');

stacksLinkedLists.pop().pop().pop();

console.log(stacksLinkedLists);
