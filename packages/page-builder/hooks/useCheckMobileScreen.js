import { useEffect, useState } from 'react';

const useCheckMobileScreen = () => {
	const [isMobile, setIsMobile] = useState(false);

	const handleWindowSizeChange = () => {
		if (window.innerWidth < 720) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	return {
		isMobile,
	};
};

export default useCheckMobileScreen;
