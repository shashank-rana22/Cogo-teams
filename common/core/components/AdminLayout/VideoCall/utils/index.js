export const stopStream = (stream_type, current_stream) => {
	if (!current_stream[stream_type]) return;

	const tracks = current_stream[stream_type].getTracks();
	tracks.forEach((track) => {
		track.stop();
	});
};
