import { Checkbox } from '@cogoport/components';

import checkboxSelectionChecks from '../../utils/checkboxSelectionChecks';

const ELEMENT_NOT_FOUND = -1;

export const onChangeTableBodyCheckbox = ({ itemData = {}, setApiData = () => {} }) => {
	const { id = '' } = itemData || {};
	setApiData((prevData) => {
		const index = (prevData?.list || [])?.findIndex((item) => item?.id === id);
		if (index !== ELEMENT_NOT_FOUND) {
			const newList = [...prevData.list];
			const isError = checkboxSelectionChecks({ list: newList[index] });
			newList[index] = { ...newList[index], checked: !newList[index].checked, hasError: isError };
			return { ...prevData, list: newList };
		}
		return prevData;
	});
};

const onChangeTableHeaderCheckbox = ({ event, setApiData }) => {
	setApiData((prevData) => {
		const { list = [] } = prevData || {};
		const newList = (list || [])?.map((item) => {
			const isError = checkboxSelectionChecks({ item });
			return ({
				...item,
				checked  : item?.invoiceType === 'CREDIT NOTE' ? false : event.target.checked,
				hasError : isError,
			});
		});
		return { ...prevData, list: newList };
	});
};

export function GetTableHeaderCheckbox({
	apiData = {},
	data = {},
	loading = false,
	setApiData = () => {},
	allowed = true,
}) {
	const { list = [] } = apiData || {};
	const { list: dataList = [] } = data || {};
	const isCheckedLength = (list || [])?.filter((value) => value?.checked).length;
	const invoicesLength = (dataList || [])?.filter((val) => (val?.invoiceType !== 'CREDIT NOTE'))?.length;
	const isAllRowsChecked = isCheckedLength === invoicesLength;
	return (
		<Checkbox
			checked={isAllRowsChecked && !loading}
			onChange={(e) => onChangeTableHeaderCheckbox({ event: e, setApiData })}
			disabled={!allowed}
		/>
	);
}
