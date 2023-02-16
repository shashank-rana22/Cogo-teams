function IncompletionReasons({ completionMessages }) {
	let message = '';
	// eslint-disable-next-line no-return-assign
	Object.keys(completionMessages || {}).forEach((key) => {
		message	+= (`${key} ${completionMessages[key][0]}. `);
	});
	return message;
}
export default IncompletionReasons;
