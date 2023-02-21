import { useEffect } from 'react';

function useKyc({
	getVendor = () => {},
}) {
	useEffect(() => {
		getVendor();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const response = {};

	return {
		response,
	};
}

export default useKyc;
