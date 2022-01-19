// ERRORS
console.fatal = (string) => {
	console.log(`\x1b[31m[FATAL] \x1b[0m${string}`);
};
console.minor = (string) => {
	console.log(`\x1b[33m[MINOR] \x1b[0m${string}`);
};
console.small = (string) => {
	console.log(`\x1b[40m[SMALL] \x1b[0m${string}`);
};

Math.range = function range(num) {
	const i = [];
	for(let num2 = 0; i.length <= num; num2++) {
		i.push(num2);
	}
	return i;
};