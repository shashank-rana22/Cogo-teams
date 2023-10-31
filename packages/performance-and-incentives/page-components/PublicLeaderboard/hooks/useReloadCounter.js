import { useEffect, useState } from 'react';

const useReloadCounter = ({ seconds = '300', functionToCall = () => {} }) => {
	const [reloadCounter, setNextReload] = useState(seconds);

	useEffect(() => {
		setNextReload(seconds);
	}, [seconds]);

	useEffect(() => {
		if (reloadCounter > 0) {
			const intervalId = setInterval(() => {
				setNextReload(reloadCounter - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}
		// if (reloadCounter === 0) {
		// 	setNextReload(seconds);
		// 	functionToCall();
		// }

		return () => {};
	}, [reloadCounter, functionToCall, seconds]);

	return { reloadCounter };
};

export default useReloadCounter;
