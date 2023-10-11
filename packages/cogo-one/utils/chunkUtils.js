function splitStringIntoChunks({ content, chunkSize = 500 * 1024 }) {
	let chunks = [];
	for (let i = 0; i < content.length; i += chunkSize) {
		chunks = [...chunks, content.slice(i, i + chunkSize)];
	}
	return chunks;
}

function combineChunks({ chunks = {} }) {
	return chunks.docs.reduce(
		(prevChunk, chunk) => ({
			ids     : [...prevChunk.ids, chunk.id],
			content : prevChunk?.content || `${chunk.data().content}`,
		}),
		{ content: '', ids: [] },
	);
}

export { splitStringIntoChunks, combineChunks };
