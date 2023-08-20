class HashTable {
	constructor(fixedSize) {
		this.fixedSize = fixedSize;
		this._data = new Array();
	}

	find(key) {
		const blocks = [];
		const bucketLists = this._data;

		for (let i = 0; i < bucketLists.length; i++) {
			// first level of bucket list for the key
			const levelOne = bucketLists[i][0];

			if (levelOne === key) {
				blocks.push(...bucketLists[i]);
			}

			for (let j = 0; j < levelOne.length; j++) {
				const hashCollision = levelOne[j];

				if (hashCollision[0] === key) {
					blocks.push(hashCollision);
				}
			}
		}

		return blocks;
	}

	set(key, value) {
		if (!this._isAllowedPushData(this.fixedSize, this._data.length)) {
			this._printErrorMessage('You are not allowed to add more item');
		}

		this._data.push([key, value]);

		if (this._isDuplicatedKey(key)) {
			const duplicatedItem = this._findDuplicatedItem(key);

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

	_findDuplicatedItem(keyLookup) {
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
			const [keyExist] = item;

			if (keyExist === keyLookup && seenItem[keyExist]) {
				return true; // Duplicate key found
			}

			seenItem[keyExist] = true;
			return false;
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

const hashTable = new HashTable(50);

hashTable.set('grapes', 10_000);
hashTable.set('grapes', 20_000);
hashTable.set('apple', 50);
hashTable.set('apple', 520);

hashTable.set('banana', 150);

console.log(hashTable.find('grapes'));
