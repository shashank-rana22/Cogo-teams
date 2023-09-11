import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const FOURTH_ELEMENT = 3;

export const getPanHolderStatusOptions = () => [
	{ label: 'Private Limited', value: 'private_limited' },
	{ label: 'Public Limited', value: 'public_limited' },
	{ label: 'Partnership', value: 'partnership' },
	{
		label : 'Limited Liability Partnership',
		value : 'limited_liability_partnership',
	},
	{ label: 'Proprietorship', value: 'proprietorship' },
	{ label: 'Other', value: 'other' },
];

const PAN_HOLDER_STATUS = {
	C : 'private_limited',
	F : 'partnership',
	P : 'proprietorship',
};

export const getPanHolderStatus = (pan = '') => {
	if ((pan || '').length !== GLOBAL_CONSTANTS.PAN_LENGTH) {
		return null;
	}

	return PAN_HOLDER_STATUS[pan[FOURTH_ELEMENT]] || 'other';
};
