function splitStringIntoChunks({ content, chunkSize = 500 * 1024 }) {
	console.log('content:', content.length);
	let chunks = [];
	for (let i = 0; i < content.length; i += chunkSize) {
		chunks = [...chunks, content.slice(i, i + chunkSize)];
	}
	return chunks;
}

function combineChunks({ chunks = {} }) {
	return chunks.docs.reduce(
		(prevChunk, chunk) => prevChunk + chunk.data().content,
		'',
	);
}

export { splitStringIntoChunks, combineChunks };
