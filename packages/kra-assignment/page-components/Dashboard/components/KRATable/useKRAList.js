import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useKRAList = () => {
	const [selectedValue, setSelectedValue] = useState();

	const [{ data, loading }, trigger] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_kra',
		},
		{ manual: true },
	);

	const KRAOptions = [
		{
			value : 'kra_1',
			label : 'KRA 1',
		},
	];

	return { selectedValue, setSelectedValue, KRAOptions };
};

export default useKRAList;
