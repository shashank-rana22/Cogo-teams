import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const useKRAList = () => {
	const [selectedValue, setSelectedValue] = useState();
	const [inputValue, setInputValue] = useState([]);

	const [{ data, loading }] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_kra',
		},
		{ manual: false },
	);

	const { list } = data || {};

	const KRAOptions = (list || []).map((element) => (
		{
			value : element?.id,
			label : element?.kra_name,
		}
	));

	const onClickAddKRAs = () => {
		(selectedValue || []).map((value) => (
			setInputValue((pv) => ([
				...pv,
				{
					kra_assigned : value,
					name         : (list || []).find((element) => (element?.id === value)).kra_name,
					weightage    : 1 / ((selectedValue || []).length),
				},

			]))
		));
		setSelectedValue();
	};

	return {
		selectedValue,
		setSelectedValue,
		KRAOptions,
		inputValue,
		setInputValue,
		onClickAddKRAs,
		loading,
	};
};

export default useKRAList;
