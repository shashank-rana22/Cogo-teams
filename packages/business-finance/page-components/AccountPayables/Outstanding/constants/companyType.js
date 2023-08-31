import { startCase } from '@cogoport/utils';

const companyTypes = [
	'private_limited',
	'public_limited',
	'one_person_company',
	'limited_liability_partnership',
	'saas',
	'representative_office',
	'joint_stock_company',
	'branch',
	'other',
];

export const companyTypeOptions = companyTypes.map((option) => ({
	label : startCase(option),
	value : option,
	name  : option,
}));
