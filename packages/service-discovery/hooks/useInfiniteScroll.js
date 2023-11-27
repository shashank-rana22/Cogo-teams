import { useState, useEffect } from 'react';

function useInfiniteScroll({ hasMore, refetchSearch = () => {} }) {
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >= document.body.scrollHeight
				&& !isFetching
				&& hasMore
			) {
				setIsFetching(true);

				setTimeout(() => {
					refetchSearch({ show_more: true, setIsFetching });
				}, [100]);
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => window.removeEventListener('scroll', handleScroll);
	}, [isFetching, hasMore, refetchSearch]);

	return { isFetching, hasMore };
}

export default useInfiniteScroll;
