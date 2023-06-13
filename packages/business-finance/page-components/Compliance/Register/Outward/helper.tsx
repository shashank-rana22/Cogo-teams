import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const getMonth = GLOBAL_CONSTANTS.months;
export const optionsMonth = (getMonth || [{}]).map((item: string, index: number) => {
	const count = index + 1;
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
