import { useEffect, useRef } from 'react';

const useInterval = (callback, delay = 0) => {
	const savedCallback = useRef();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const handler = (...args) => savedCallback.current(...args);

		const id = setInterval(handler, delay);
		return () => clearInterval(id);
	}, [delay]);
};

export default useInterval;
