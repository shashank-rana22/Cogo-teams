import { useState, useEffect } from 'react';

const useAutoRefresh = (time = 15) => {
	const [lastRefresh, setLastRefresh] = useState(new Date());

	useEffect(() => {
		const interval = setInterval(() => {
			setLastRefresh(new Date());
		}, time * 1000 * 60);

		return () => clearInterval(interval);
	}, []);

	return { lastRefresh };
};

export default useAutoRefresh;
