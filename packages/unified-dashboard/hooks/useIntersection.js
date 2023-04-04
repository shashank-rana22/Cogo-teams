import { useState, useEffect, useMemo } from 'react';

function useIsInViewport(ref, rootMargin) {
	const [isIntersecting, setIsIntersecting] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const interSectionMargin = isMobile ? '-100px' : rootMargin;

	const handleResize = () => {
		if (window.innerWidth < 720) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
	});

	const observer = useMemo(() => {
		let observerBool = null;
		if (typeof window !== 'undefined') {
			observerBool = new IntersectionObserver(
				([entry]) => {
					setIsIntersecting(entry.isIntersecting);
				},
				{ interSectionMargin },
			);

			return observerBool;
		}
		return false;
	}, [interSectionMargin]);

	useEffect(() => {
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, [ref, observer]);

	return isIntersecting;
}

export default useIsInViewport;
