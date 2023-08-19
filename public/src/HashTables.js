class HashTable {
	constructor(size) {
		this._fixedSize = size;
		this._data = new Array();
	}

	get(key) {
		for (let i = 0; i < this._data.length; i++) {
			if (this._data[i][0] === key) {
				return this._data[i];
			}
		}
	}

	set(key, value) {
		if (!this._isAllowedPushData(this._fixedSize, this._data.length)) {
			this._printErrorMessage('You are not allowed to add more item');
		}

		this._data.push([key, value]);

		if (this._isDuplicatedKey(key)) {
			const duplicatedItem = this._getDuplicatedItem(key);

			this._addHashCollision(duplicatedItem);
			this._removeDuplicatedItem(key);
		}

		return this;
	}

	_printErrorMessage(errorMessage) {
		throw new Error(errorMessage);
	}

	_addHashCollision(duplicatedItem) {
		this._data.push([duplicatedItem]);
	}

	_isAllowedPushData(allowedSize, currentData) {
		return allowedSize > currentData;
	}

	_getDuplicatedItem(keyLookup) {
		const duplicatedItem = [];

		for (let i = 0; i < this._data.length; i++) {
			const [keyItem] = this._data[i];

			if (keyItem === keyLookup) {
				duplicatedItem.push(this._data[i]);
			}
		}

		return duplicatedItem;
	}
	_removeDuplicatedItem(keyLookup) {
		const filteredItem = this._data.filter(([keyExistence]) => {
			return keyExistence !== keyLookup;
		});

		this._data = filteredItem;
	}

	_isDuplicatedKey(keyLookup) {
		const seenItem = {};

		return this._data.some((item) => {
			if (Array.isArray(item)) {
				const [keyExist] = item;

				if (keyExist === keyLookup && seenItem[keyExist]) {
					return true; // Duplicate key found
				}

				seenItem[keyExist] = true;
				return false;
			}
		});
	}

	_hash(key) {
		let hash = 0;

		for (let i = 0; i < key.length; i++) {
			hash = (hash + key.charCodeAt(i) * i) % this.data.length;
		}

		return hash;
	}
}

const myHashTable = new HashTable(50);

myHashTable.set('grapes', 10_000);
myHashTable.set('grapes', 20_000);
myHashTable.set('apple', 50);
myHashTable.set('apple', 520);

myHashTable.set('banana', 150);

console.log(myHashTable);
