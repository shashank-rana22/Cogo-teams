import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const TOTAL_WEIGHTAGE = 1;
const DEFAULT_WEIGHTAGE_OF_KRA = 0;

const useKRAList = ({ filters = {}, selectAccordian = [], dataFrom }) => {
	const [selectedValue, setSelectedValue] = useState([]);
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

	useEffect(() => {
		if (!isEmpty(selectAccordian) && dataFrom === 'AccordianData') {
			const detailsArray = (selectAccordian || []).map(({ id: kra_assigned, kra_name: name, weightage }) => ({
				kra_assigned,
				name,
				weightage,
			}));
			setInputValue(detailsArray);
		}
	}, [selectAccordian, dataFrom]);

	const { list } = data || {};

	const initialKRAOptions = (list || []).map((element) => (
		{
			value : element?.id,
			label : element?.kra_name,
		}
	));

	const selectedKRAkeys = (inputValue || []).map((item) => item?.kra_assigned);

	const kraOptions = (initialKRAOptions || []).filter((element) => !selectedKRAkeys.includes(element?.value));

	const onClickAddKRAs = () => {
		(selectedValue || []).map((value) => (
			setInputValue((pv) => ([
				...pv,
				{
					kra_assigned : value,
					name         : (list || []).find((element) => (element?.id === value)).kra_name,
					weightage    : isEmpty(inputValue)
						? TOTAL_WEIGHTAGE / ((selectedValue || []).length) : DEFAULT_WEIGHTAGE_OF_KRA,
				},

			]))
		));
		setSelectedValue();
	};

	return {
		selectedValue,
		setSelectedValue,
		kraOptions,
		inputValue,
		setInputValue,
		onClickAddKRAs,
		loading,
	};
};

export default useKRAList;
