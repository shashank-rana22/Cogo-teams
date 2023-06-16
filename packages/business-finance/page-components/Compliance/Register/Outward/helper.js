import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getMonth = GLOBAL_CONSTANTS.months;
const INCREASE_COUNT = 1;
export const optionsMonth = (getMonth || [{}]).map((item, index) => {
	const count = index + INCREASE_COUNT;
	const options = { value: count?.toString(), label: item };
	return options;
});

const entity = Object.keys(GLOBAL_CONSTANTS.cogoport_entities);
const filteredArray = entity.filter((item) => item !== '201' && item !== '401' && item !== '501');
export const optionEntity = filteredArray.map((item) => ({ value: item, label: item }));

const entity101GSTIN = ['27AAGCC4470P1Z5', 'MUMC22090F', 'MUMC26454B'];
const entity301GSTIN = ['06AAICC8838P1ZV', '07AAACF2136K1ZT', '27AAACF2136K1ZR', '27AAICC8838P1ZR', 'MUMC26454B'];

export const optionsGSTIN = (entityVal) => {
	if (entityVal === '101') {
		return entity101GSTIN.map((item) => ({ value: item, label: item }));
	}
	if (entityVal === '301') {
		return entity301GSTIN.map((item) => ({ value: item, label: item }));
	}
	return [];
};

export 	const getSupplierData = (supplierName, suppGstIn, entityCode) => [
	{ heading: 'Supplier Name :', value: supplierName || '--' },
	{ heading: 'GSTIN  :', value: suppGstIn || '--' },
	{ heading: 'Entity :', value: entityCode || '--' },
];

const YEAR_MINS = 1;
const YEAR_MINS_TWO = 2;
const YEAR_MINS_THREE = 3;

const currentYear = new Date().getFullYear();
const newArray = [currentYear, currentYear - YEAR_MINS, currentYear - YEAR_MINS_TWO, currentYear - YEAR_MINS_THREE];

export const optionsYear = (newArray || [{}]).map((item) => (
	{ value: item.toString(), label: item.toString() }));

const GET_ZERO = 0;
const GET_ONE = 1;
const GET_TWO = 2;
function generateLastThreeFinancialYears() {
	const FINANCIAL_YEARS = [];

	const yearRange = [GET_ZERO, GET_ONE, GET_TWO];
	yearRange.forEach((i) => {
		const startYear = currentYear - i;
		const endYear = startYear + GET_ONE;

		const financialYear = {
			value : startYear,
			label : `${startYear}-${endYear.toString().substr(-GET_TWO)}`,
		};

		FINANCIAL_YEARS.push(financialYear);
	});

	return FINANCIAL_YEARS;
}

export const lastThreeFinancialYears = generateLastThreeFinancialYears();
