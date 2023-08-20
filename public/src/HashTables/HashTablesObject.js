class HashTable {
	constructor(fixedSize, numberElements) {
		if (this._isNumberElement(numberElements)) {
			this._printErrorMessage('Number of elements required!');
		}

		this._data = {};
		this.fixedSize = fixedSize;
		this.numberElements = numberElements;
	}

	_isNumberElement(numberElements) {
		return isNaN(numberElements);
	}

	getAllBuckets() {
		return this._data;
	}

	findValue(valueLookup) {
		const buckets = this._getBuckets(this._data);
		const foundBuckets = {};

		for (let i = 0; i < buckets.length; i++) {
			const bucket = buckets[i];

			for (const [bucketKey, bucketValue] of Object.entries(bucket)) {
				if (bucketValue === valueLookup) {
					foundBuckets[bucketKey] = bucketValue;
				}
			}
		}

		return foundBuckets;
	}

	deleteByValue(valueLookup) {
		for (const [addressKey, bucket] of Object.entries(this._data)) {
			for (const [bucketKey, bucketValue] of Object.entries(bucket)) {
				if (bucketValue === valueLookup) {
					const firstItem = Object.keys(bucket)[0];

					if (firstItem) {
						delete bucket[firstItem];
						break;
					}
				}
			}
		}
	}

	deleteAllByValue(valueLookup) {
		for (const [addressKey, bucket] of Object.entries(this._data)) {
			for (const [bucketKey, bucketValue] of Object.entries(bucket)) {
				if (bucketValue === valueLookup) {
					const firstItem = Object.keys(bucket)[0];

					if (firstItem) {
						delete bucket[firstItem];
					}
				}
			}
		}
	}

	_getBuckets(bucket) {
		return Object.entries(bucket).map(([_, bucketItem]) => bucketItem);
	}

	set(key, value) {
		const countItems = Object.keys(this._data).length;

		if (!this._isAllowedInsertData(this.fixedSize, countItems)) {
			this._printErrorMessage('You are not allowed to add more item');
		}

		const calculatedAllocationAddress = this._getCalculatedAllocationAddress(value);

		const itemPayload = {
			key,
			value,
			calculatedAllocationAddress,
		};

		this._insertAllocatedItem(itemPayload);

		return this;
	}

	_isAllowedInsertData(allowedSize, currentData) {
		return allowedSize > currentData;
	}

	_getCalculatedAllocationAddress(value) {
		return value % this.numberElements;
	}

	_insertAllocatedItem(payload) {
		const { key, value, calculatedAllocationAddress } = payload;

		this._data = {
			...this._data,
			[calculatedAllocationAddress]: {
				...this._data[calculatedAllocationAddress],
				[this._hash(key)]: value,
			},
		};
	}

	_hash(key) {
		return `${key}-${crypto.randomUUID()}`;
	}

	_printErrorMessage(errorMessage) {
		throw new Error(errorMessage);
	}
}

const hashTable = new HashTable(50, 13);

hashTable.set('grapes', 10_000);
hashTable.set('grapes', 10_000);
hashTable.set('grapes', 10_000);

hashTable.set('apple', 50);
hashTable.set('apple', 50);

hashTable.set('banana', 150);

hashTable.deleteByValue(50);
hashTable.deleteByValue(50);


console.log(hashTable.getAllBuckets());
// console.log(hashTable.find('grapes'));
