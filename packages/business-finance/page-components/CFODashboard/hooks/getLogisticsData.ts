import { useState } from 'react';

const useGetPurchaseViewList = () => {
	const [recievablesTab, setRecievablesTab] = useState();
	const [payablesTab, setPayablesTab] = useState('all');
	const [searchValue, setSearchValue] = useState('');

	return {
		payablesTab,
		searchValue,
		setSearchValue,
		setPayablesTab,
		recievablesTab,
		setRecievablesTab,
	};
};

export default useGetPurchaseViewList;
