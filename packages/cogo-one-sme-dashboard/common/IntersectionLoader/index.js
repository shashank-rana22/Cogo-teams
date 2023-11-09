import React, { useState, useRef, useEffect } from 'react';

import { LoadingState } from '../Elements';

import styles from './styles.module.css';

function IntersectionLoader({
	children = null,
	headerText = '',
	hiderAfterLoaded = false,
}) {
	const ref = useRef(null);
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		if (!isVisible) {
			const observer = new IntersectionObserver(
				([entry]) => {
					setIsVisible((prev) => (prev || entry.isIntersecting));
				},
				{ rootMargin: '-150px' },
			);
			observer.observe(ref.current);

			return () => observer.disconnect();
		}

		return () => null;
	}, [isVisible]);

	return (
		<div className={styles.container} ref={ref}>
			{(!headerText || (hiderAfterLoaded && isVisible))
				? null
				: (
					<div className={styles.header}>
						{headerText}
					</div>
				)}
			{isVisible ? children : <LoadingState />}
		</div>
	);
}

export default IntersectionLoader;
