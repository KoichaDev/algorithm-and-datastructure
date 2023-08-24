class BinarySearchTrees {
	constructor() {
		this.root = null;
	}

	lookupNode(value) {
		if (!this.root) {
			return null;
		}

		const nodePayload = {
			value: value,
			currentNode: this.root,
		};

		return this.#traverseNode(nodePayload);
	}

	#traverseNode(nodePayload) {
		let { value, currentNode } = nodePayload;

		while (currentNode) {
			if (value < currentNode.value) {
				currentNode = currentNode.left;
			}

			if (value > currentNode.value) {
				currentNode = currentNode.right;
			}

			if (value === currentNode.value) {
				return currentNode;
			}
		}
	}

	insertNode(value) {
		const newNode = this.#createNewNode(value);

		if (!this.root) {
			return (this.root = newNode);
		}

		let currentNode = this.root;

		const nodePayload = {
			value,
			newNode,
			currentNode,
		};

		this.#traverseToInsertNode(nodePayload);
	}

	#traverseToInsertNode(payload) {
		let { value, newNode, currentNode } = payload;

		while (true) {
			if (value < currentNode.value) {
				if (!currentNode.left) {
					currentNode.left = newNode;
					return this;
				}

				currentNode = currentNode.left;
			}

			if (value > currentNode.value) {
				if (!currentNode.right) {
					currentNode.right = newNode;
					return this;
				}

				currentNode = currentNode.right;
			}
		}
	}

	#createNewNode(value) {
		return {
			value: value,
			left: null,
			right: null,
		};
	}
}

const binarySearchTrees = new BinarySearchTrees();

binarySearchTrees.insertNode(9);
binarySearchTrees.insertNode(4);
binarySearchTrees.insertNode(6);
binarySearchTrees.insertNode(20);
binarySearchTrees.insertNode(170);
binarySearchTrees.insertNode(15);
binarySearchTrees.insertNode(1);

const x = binarySearchTrees.lookupNode(4);

console.log(x);
console.log(binarySearchTrees);
