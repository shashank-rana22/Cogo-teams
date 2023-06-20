import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const TOTAL_WEIGHTAGE = 1;

const useKRAList = ({ filters = {} }) => {
	const [selectedValue, setSelectedValue] = useState();
	const [inputValue, setInputValue] = useState([]);

	const [{ data, loading }] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_kra',
			params : {
				filters,
			},
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
					weightage    : TOTAL_WEIGHTAGE / ((selectedValue || []).length),
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
