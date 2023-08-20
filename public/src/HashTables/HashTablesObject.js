class HashTable {
	#data = {};
	#fixedSize;
	#numberElements;

	constructor(fixedSize, numberElements) {
		if (this.#isNumberElement(numberElements)) {
			this.#printErrorMessage('Number of elements required!');
		}

		this.#fixedSize = fixedSize;
		this.#numberElements = numberElements;
	}

	#isNumberElement(numberElements) {
		return isNaN(numberElements);
	}

	getAllBuckets() {
		return this.#data;
	}

	findValue(valueLookup) {
		const buckets = this.#getBuckets(this.#data);
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
		const buckets = this.#getBuckets(this.#data);

		for (const bucket of buckets) {
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

		const allocationAddresses = this.#getAllocationAddresses(this.#data);

		this.#deleteAllocationAddress(allocationAddresses);
	}

	#deleteAllocationAddress(allocationAddresses) {
		for (let i = 0; i < allocationAddresses.length; i++) {
			const allocationAddress = allocationAddresses[i];

			if (this.#isEmptyObject(this.#data[allocationAddress])) {
				delete this.#data[allocationAddress];
			}
		}
	}

	#getAllocationAddresses() {
		return Object.keys(this.#data);
	}

	deleteAllByValue(valueLookup) {
		const buckets = this.#getBuckets(this.#data);

		for (const bucket of buckets) {
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

	#isEmptyObject(object) {
		return Object.values(object).length === 0;
	}

	#getBuckets(bucket) {
		return Object.entries(bucket).map(([_, bucketItem]) => bucketItem);
	}

	set(key, value) {
		const countItems = Object.keys(this.#data).length;

		if (!this.#isAllowedInsertData(this.#fixedSize, countItems)) {
			this.#printErrorMessage('You are not allowed to add more item');
		}

		const calculatedAllocationAddress = this.#getCalculatedAllocationAddress(value);

		const itemPayload = {
			key,
			value,
			calculatedAllocationAddress,
		};

		this.#insertAllocatedItem(itemPayload);

		return this;
	}

	#isAllowedInsertData(allowedSize, currentData) {
		return allowedSize > currentData;
	}

	#getCalculatedAllocationAddress(value) {
		return value % this.#numberElements;
	}

	// * This solution is O(1)
	#insertAllocatedItem(payload) {
		const { key, value, calculatedAllocationAddress } = payload;

		const addressData = this.#data[calculatedAllocationAddress] || {};

		addressData[this.#hash(key)] = value;

		this.#data[calculatedAllocationAddress] = addressData;
	}

	// ! ⛔️ This solution is O(n)
	// #insertAllocatedItem(payload) {
	// 	const { key, value, calculatedAllocationAddress } = payload;

	// 	this.#data = {
	// 		...this.#data,
	// 		[calculatedAllocationAddress]: {
	// 			...this.#data[calculatedAllocationAddress],
	// 			[this.#hash(key)]: value,
	// 		},
	// 	};
	// }

	#hash(key) {
		return `${key}-${crypto.randomUUID()}`;
	}

	#printErrorMessage(errorMessage) {
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

hashTable.set('orange', 1);
hashTable.set('orange', 1010);

// hashTable.deleteByValue(50);
hashTable.deleteByValue(50);

console.log(hashTable.getAllBuckets());
