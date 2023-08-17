import ENTITY_FEATURE_MAPPING from '@cogoport/globalization/constants/entityFeatureMapping';
import ENTITY_MAPPING from '@cogoport/globalization/constants/entityMapping';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getMonth = GLOBAL_CONSTANTS.months;
const INCREASE_COUNT = 1;
export const optionsMonth = (getMonth || [{}]).map((item, index) => {
	const count = index + INCREASE_COUNT;
	const options = { value: count?.toString(), label: item };
	return options;
});

const keysWithCompliance = Object.keys(ENTITY_FEATURE_MAPPING).filter(
	(key) => ENTITY_FEATURE_MAPPING[key].feature_supported.includes('compliance'),
);
export const optionEntity = keysWithCompliance.map((item) => ({ value: item, label: item }));

export const optionsGSTIN = (entityVal) => (ENTITY_MAPPING[entityVal]
	? ENTITY_MAPPING[entityVal]?.GSTIN.map((item) => ({ value: item, label: item })) : []);

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

const GET_ZERO_FOR_YEAR = 0;
const GET_ONE_FOR_YEAR = 1;
const GET_TWO_FOR_YEAR = 2;
function generateLastThreeFinancialYears() {
	const FINANCIAL_YEARS = [];

	const yearRange = [GET_ZERO_FOR_YEAR, GET_ONE_FOR_YEAR, GET_TWO_FOR_YEAR];
	yearRange.forEach((i) => {
		const startYear = currentYear - i;
		const endYear = startYear + GET_ONE_FOR_YEAR;

		const financialYear = {
			value : startYear,
			label : `${startYear}-${endYear.toString().substr(-GET_TWO_FOR_YEAR)}`,
		};

		FINANCIAL_YEARS.push(financialYear);
	});

	return FINANCIAL_YEARS;
}

export const lastThreeFinancialYears = generateLastThreeFinancialYears();
