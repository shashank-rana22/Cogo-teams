import { useEffect, useState } from 'react';

const useCheckMobileScreen = () => {
	const [width, setWidth] = useState();

	const handleWindowSizeChange = () => {
		setWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		};
	}, []);

	return {
		width,
	};
};

export default useCheckMobileScreen;
