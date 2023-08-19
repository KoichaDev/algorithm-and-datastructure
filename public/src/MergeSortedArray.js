class MergeSortedArray {
	loopFlatArray(arr) {
		const flatArr = [];
		for (let i = 0; i < arr.length; i++) {
			const levelOne = arr[i];

			for (let j = 0; j < levelOne.length; j++) {
				flatArr.push(levelOne[j]);
			}
		}

		return flatArr;
	}
}

const arr = [
	[0, 3, 4, 31],
	[4, 6, 30],
];

const mergeSortedArray = new MergeSortedArray();

const result = mergeSortedArray.loopFlatArray2(arr);

console.log(result);
