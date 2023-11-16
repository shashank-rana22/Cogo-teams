import { useLayoutEffect, useState } from 'react';

const MOBILE_MAX_WIDTH = 576;

const useGetIsMobile = () => {
	const [isMobile, setIsMobile] = useState(
		() => window.innerWidth < MOBILE_MAX_WIDTH,
	);

	const handleResize = () => {
		setIsMobile(window.innerWidth < MOBILE_MAX_WIDTH);
	};

	useLayoutEffect(
		() => {
			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
			};
		},
		[],
	);

	return {
		isMobile,
		setIsMobile,
	};
};

export default useGetIsMobile;
