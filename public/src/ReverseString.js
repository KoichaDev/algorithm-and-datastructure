class ReverseString {
	hocReverse(value) {
		return value.split('').reverse().join('');
	}
	loopReverse(value) {
		if (typeof value !== 'string') {
			throw new Error('undefined string value');
		}

		if (value.length === 0) {
			throw new Error('Empty string value');
		}

		if (value.length === 1) {
			throw new Error('A Single character is not valid!');
		}

		const backward = [];

		for (let i = value.length; i >= 0; i--) {
			backward.push(value[i]);
		}

		return backward.join('');
	}
}

const string = 'Hi, my name is André';

const reverseString = new ReverseString();

const result = reverseString.loopReverse(string);
const result2 = reverseString.hocReverse(string);

console.log(result);
console.log(result2);
