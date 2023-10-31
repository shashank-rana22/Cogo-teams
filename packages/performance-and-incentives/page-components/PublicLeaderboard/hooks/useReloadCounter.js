import { useEffect, useState } from 'react';

const useReloadCounter = ({ seconds = '300', functionToCall = () => {} }) => {
	const [nextReload, setNextReload] = useState(seconds);

	useEffect(() => {
		setNextReload(seconds);
	}, [seconds]);

	useEffect(() => {
		if (nextReload > 0) {
			const intervalId = setInterval(() => {
				setNextReload(nextReload - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}
		if (nextReload === 0) {
			setNextReload(seconds);
			functionToCall();
		}

		return () => {};
	}, [nextReload, functionToCall, seconds]);

	return { nextReload };
};

export default useReloadCounter;
