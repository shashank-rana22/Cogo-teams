import { Checkbox } from '@cogoport/components';

const ELEMENT_NOT_FOUND = -1;

export const onChangeTableHeaderCheckbox = ({ event, setApiData = {} }) => {
	setApiData((prevData) => {
		const { list = [] } = prevData || {};
		const newList = (list || [])?.map((item) => ({
			...item,
			checked: event.target.checked,
		}));
		return { ...prevData, list: newList };
	});
};

export function GetTableHeaderCheckbox({
	apiData = {},
	loading = false,
	setApiData = () => {},
}) {
	const { list: dataList = [] } = apiData || {};
	const isCheckedLength = (dataList || []).filter((value) => value?.checked)?.length;
	const isAllRowsChecked = isCheckedLength === dataList?.length;
	return (
		<Checkbox
			checked={isAllRowsChecked && !loading}
			onChange={(e) => onChangeTableHeaderCheckbox({ event: e, setApiData })}
		/>
	);
}

export const onChangeTableBodyCheckbox = ({ itemData = {}, setApiData = () => {} }) => {
	const { organizationId = '' } = itemData || {};
	setApiData((prevData) => {
		const index = ((prevData || [])?.list || []).findIndex(
			(item) => item?.organizationId === organizationId,
		);
		if (index !== ELEMENT_NOT_FOUND) {
			const newList = [...prevData.list];
			newList[index] = {
				...newList[index],
				checked: !newList[index]?.checked,
			};
			return {
				...prevData,
				list: newList,
			};
		}
		return prevData;
	});
};
