export class MyArray {
	constructor() {
		this._data = {};
		this._length = 0;
	}

	get() {
		return this._data;
	}

	push(value) {
		this._data[this._length] = value;
		this._length++;
		return this;
	}

	pop() {
		this._length--;
		delete this._data[this._length];

		return this;
	}

	popIndexAt(index) {
		const currentItem = this._data[index];

		if (currentItem === undefined) {
			throw new Error('Undefined item');
		}

		this._length--;
		this._shiftItems(index);
		delete this._data[this._length];

		return this;
	}

	_shiftItems(index) {


		
		for (let i = index; i < this._length - 1; i++) {
			this._data[i] = this._data[i + 1];
		}
		delete this._data[this._length - 1];

		// Update keys
		const keys = Object.keys(this._data);
		const newData = {};
		for (let i = 0; i < keys.length; i++) {
			newData[i] = this._data[keys[i]];
		}
		this._data = newData;
	}
}

const myArray = new MyArray();

myArray.push(2).push(99).push(123);

myArray.popIndexAt(2);

const get = myArray.get();

console.log(get);

// console.log(get);
