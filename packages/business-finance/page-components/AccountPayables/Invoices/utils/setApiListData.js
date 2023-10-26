const MIN_AMOUNT = 0;
const ELEMENT_NOT_FOUND = -1;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

const setApiListData = ({ itemData = {}, value = '', key = '', checked = false, setApiData = () => {} }) => {
	setApiData((prevApiData) => {
		const newValue = { ...prevApiData };
		const index = newValue?.list?.findIndex(
			(item) => item?.id === itemData?.id,
		);
		const {
			payableValue,
			invoiceAmount,
			tdsDeducted,
			payableAmount,
			tdsAmount,
		} = newValue.list[index];
		const checkAmount = (+invoiceAmount * TEN_PERCENT) / HUNDERED_PERCENT;

		let maxValueCrossed = false;
		let lessValueCrossed = false;
		let lessTdsValueCrossed = false;
		let maxTdsValueCrossed = false;

		if (key === 'inputAmount') {
			maxValueCrossed = +value > +payableValue;
			lessValueCrossed = Number.parseInt(value, 10) <= MIN_AMOUNT;
			maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
			lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
		} else if (key === 'tdsAmount') {
			maxValueCrossed = +payableAmount > +payableValue;
			lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
			maxTdsValueCrossed = +value + +tdsDeducted > +checkAmount;
			lessTdsValueCrossed = Number.parseInt(value, 10) < MIN_AMOUNT;

			newValue.list[index].payableAmount = payableValue - value;
			newValue.list[index].inputAmount = payableValue - value;
		} else {
			maxValueCrossed = +payableAmount > +payableValue;
			lessValueCrossed = Number.parseInt(payableAmount, 10) <= MIN_AMOUNT;
			maxTdsValueCrossed = +tdsAmount + +tdsDeducted > +checkAmount;
			lessTdsValueCrossed = Number.parseInt(tdsAmount, 10) < MIN_AMOUNT;
		}

		const isError = lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed;

		if (index !== ELEMENT_NOT_FOUND) {
			newValue.list[index] = {
				...itemData,
				hasError: isError,
				checked,
			};
			newValue.list[index][key] = value;
		}
		return newValue;
	});
};

export default setApiListData;
