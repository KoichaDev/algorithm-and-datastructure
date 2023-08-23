class StacksArray {
	constructor() {
		this.top = [];
		this.bottom = [];
		this.stacks = [];
	}

	peek() {
		return this.top;
	}

	push(value) {
		const newNode = this.#createNewNode(value);

		// Update the bottom only if it's currently empty
		if (this.bottom.length === 0) {
			this.bottom.push(newNode);
		}

		if (this.top.length > 0) {
			newNode.prevNode = this.top[this.top.length - 1];
			this.top.pop();
		}

		this.top.push(newNode);
		this.stacks.push(newNode);

		return this;
	}

	pop() {
		if (this.#isEmptyStack(this.top)) {
			// Stack is empty, nothing to pop
			return null;
		}

		if (this.length === 1) {
			// If there's only one item in the stack, reset the stack
			this.top = [];
			this.bottom = [];
		} else {
			// Update the top node and remove the reference to the previous node
			this.top.pop();
		}

		return this;
	}

	#createNewNode(value) {
		return {
			value: value,
			prevNode: null,
		};
	}

	#isEmptyStack(stack) {
		return stack.length >= 0;
	}
}

const stacks = new StacksArray();

stacks.push('google').push('udemy').push('discord').push('linkedin');

// stacks.pop().pop().pop();

console.log(stacks);
