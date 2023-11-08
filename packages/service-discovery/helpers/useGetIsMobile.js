import { useEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 768;

const useGetIsMobile = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window.innerWidth < MOBILE_MAX_WIDTH) {
			setIsMobile(true);
		}

		function handleResize() {
			setIsMobile(window.innerWidth < MOBILE_MAX_WIDTH);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return isMobile;
};
export default useGetIsMobile;
