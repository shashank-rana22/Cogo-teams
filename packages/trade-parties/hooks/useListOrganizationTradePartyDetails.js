import { useState, useEffect } from 'react';

const useListOrganizationTradePartyDetails = () => {
	const [data, setData] = useState('');

	useEffect(() => {
		setData('hello');
	}, []);
	return { data };
};
export default useListOrganizationTradePartyDetails;
