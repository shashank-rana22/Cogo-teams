function base64ToArrayBuffer(base64) {
	const binaryString = window.atob(base64);
	const binaryLen = binaryString.length;
	const bytes = new Uint8Array(binaryLen);
	for (let i = 0; i < binaryLen;) {
		const ascii = binaryString.charCodeAt(i);
		bytes[i] = ascii;
		i += 1;
	}
	return bytes;
}

export default base64ToArrayBuffer;
