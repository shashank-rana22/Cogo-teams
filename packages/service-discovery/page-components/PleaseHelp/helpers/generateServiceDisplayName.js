import { startCase } from '@cogoport/utils';

const shortForms = ['fcl', 'lcl', 'ftl', 'ltl', 'cfs', 'rail'];

const generateServiceDisplayName = (serviceName) => {
	if (typeof serviceName !== 'string') {
		return '';
	}

	const service = serviceName.split('_');

	return String(
		service.reduce((accStr, str) => `${accStr} ${
			shortForms.includes(str) ? str.toUpperCase() : startCase(str)
		}`, ''),
	);
};

export default generateServiceDisplayName;
