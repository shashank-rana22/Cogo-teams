import { useState, useEffect, useMemo } from 'react';

function useIsInViewport(ref, rootMargin) {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const observer = useMemo(() => {
		let observerBool = null;
		if (typeof window !== 'undefined') {
			observerBool = new IntersectionObserver(
				([entry]) => {
					setIsIntersecting(entry.isIntersecting);
				},
				{ rootMargin },
			);

			return observerBool;
		}
		return false;
	}, []);

	useEffect(() => {
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, [ref, observer]);

	return isIntersecting;
}

export default useIsInViewport;
