function encodeToBase(inputString) {
	const encoded = btoa(inputString);
	return encoded;
}

function hashFunction({ groupMemberIds = [] }) {
	const inputString = groupMemberIds?.sort()?.join('');

	return encodeToBase(inputString);
}

export { hashFunction };
