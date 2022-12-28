const getApiErrorString = (messages: any) => Object.keys(messages || {})
	.map((_) => `${_} ${messages[_]}`)
	.join(', ');

export default getApiErrorString;
