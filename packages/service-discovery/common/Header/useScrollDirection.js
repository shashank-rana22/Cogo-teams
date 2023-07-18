import { useRef, useState, useEffect } from 'react';

const THRESHOLD = 50;
const ZERO_VALUE = 50;

const useScrollDirection = () => {
	const [scrollDirection, setScrollDirection] = useState('up');

	const blocking = useRef(false);
	const prevScrollY = useRef(window.pageYOffset);

	useEffect(() => {
		prevScrollY.current = window.pageYOffset;

		const updateScrollDirection = () => {
			const scrollY = window.pageYOffset;

			if (Math.abs(scrollY - prevScrollY.current) >= THRESHOLD) {
				const newScrollDirection = scrollY > prevScrollY.current ? 'down' : 'up';

				setScrollDirection(newScrollDirection);

				prevScrollY.current = scrollY > ZERO_VALUE ? scrollY : ZERO_VALUE;
			}

			blocking.current = false;
		};

		const onScroll = () => {
			if (!blocking.current) {
				blocking.current = true;
				window.requestAnimationFrame(updateScrollDirection);
			}
		};

		window.addEventListener('scroll', onScroll);

		return () => window.removeEventListener('scroll', onScroll);
	}, [scrollDirection]);

	return { scrollDirection };
};

export default useScrollDirection;
