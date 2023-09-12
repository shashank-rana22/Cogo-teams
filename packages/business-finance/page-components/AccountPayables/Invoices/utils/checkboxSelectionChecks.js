const MIN_AMOUNT = 0;
const HUNDERED_PERCENT = 100;
const TEN_PERCENT = 10;

const checkboxSelectionChecks = ({ item = {} }) => {
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

	return (lessTdsValueCrossed || maxTdsValueCrossed || lessValueCrossed || maxValueCrossed);
};

export default checkboxSelectionChecks;
