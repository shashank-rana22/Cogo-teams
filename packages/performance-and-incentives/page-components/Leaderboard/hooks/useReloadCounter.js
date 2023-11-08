import { useEffect, useState } from 'react';

const useReloadCounter = () => {
	const [reloadCounter, setNextReload] = useState(0);

	const startTimer = (sec) => {
		setNextReload(sec);
	};

	useEffect(() => {
		if (reloadCounter > 0) {
			const intervalId = setInterval(() => {
				setNextReload(reloadCounter - 1);
			}, 1000);

			return () => clearInterval(intervalId);
		}
		return () => {};
	}, [reloadCounter]);

	return { reloadCounter, startTimer };
};

export default useReloadCounter;
