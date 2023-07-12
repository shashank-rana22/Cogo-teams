function useCommingCall({ setInACall, setCallComming, callUpdate, setStreams }) {
	const answerOfCall = () => {
		setInACall(true);
		setCallComming(false);
		callUpdate({
			call_status: 'accepted',
		});
		navigator.mediaDevices
			.getUserMedia({ video: false, audio: true }).then((userStream) => {
				setStreams((prev) => ({ ...prev, user_stream: userStream }));
			}).catch((error) => {
				console.log('user stream is not working', error);
			});
	};

	const rejectOfCall = () => {
		callUpdate({
			call_status: 'rejected',
		});
		setCallComming(false);
	};
	return {
		answerOfCall, rejectOfCall,
	};
}

export default useCommingCall;
