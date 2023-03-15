import { useState, useEffect, useMemo } from 'react';

function useIsInViewport(ref, rootMargin) {
	const [isIntersecting, setIsIntersecting] = useState(false);

	const observer = useMemo(() => {
		let observerBool = null;
		if (typeof window !== 'undefined') {
			// eslint-disable-next-line no-undef
			observerBool = new IntersectionObserver(
				([entry]) => {
					setIsIntersecting(entry.isIntersecting);
				},
				{ rootMargin },
			);

			return observerBool;
		}
		return false;
	}, [rootMargin]);

	useEffect(() => {
		observer.observe(ref.current);

		return () => {
			observer.disconnect();
		};
	}, [ref, observer]);

	return isIntersecting;
}

export default useIsInViewport;
