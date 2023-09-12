import { Checkbox } from '@cogoport/components';

const ELEMENT_NOT_FOUND = -1;
const MIN_AMOUNT = 0;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

export const onChangeTableHeaderCheckbox = ({ event = {}, setApiData = () => {} }) => {
	setApiData((prevData) => {
		const { list = [] } = prevData || {};
		const newList = (list || [])?.map((item) => {
			const {
				payableValue = '',
				invoiceAmount = '',
				tdsDeducted = '',
				payableAmount = '',
				tdsAmount = '',
			} = item || {};
			const maxValueCrossed = +payableAmount > +payableValue;
			const lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
			const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;
			const maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
			const lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
			const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;

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
}) {
	const { list = [] } = apiData || {};
	const { list: dataList = [] } = data || {};
	const isCheckedLength = (list || [])?.filter((value) => value?.checked)?.length;
	const invoicesLength = (dataList || [])?.filter((val) => (val?.invoiceType !== 'CREDIT NOTE'))?.length;
	const isAllRowsChecked = isCheckedLength === invoicesLength;
	return (
		<Checkbox
			checked={isAllRowsChecked && !loading}
			onChange={(e) => onChangeTableHeaderCheckbox({ event: e, setApiData })}
		/>
	);
}

export const onChangeTableBodyCheckbox = ({ itemData = {}, setApiData = () => {} }) => {
	const { id = '' } = itemData || {};
	setApiData((prevData) => {
		const index = ((prevData || [])?.list || []).findIndex((item) => item?.id === id);

		if (index !== ELEMENT_NOT_FOUND) {
			const newList = [...prevData.list];
			const { payableValue, invoiceAmount, tdsDeducted, payableAmount, tdsAmount } = newList[index] || [];
			const maxValueCrossed = +payableAmount > +payableValue;
			const lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
			const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;
			const maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
			const lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
			const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;
			newList[index] = {
				...newList[index],
				checked  : !newList[index].checked,
				hasError : isError,
			};

			return { ...prevData, list: newList };
		}
		return prevData;
	});
};
