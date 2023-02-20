import { startCase } from '@cogoport/utils';

const getDesignations = (scopes) => scopes.map((scope) => ({ label: startCase(scope), value: scope }));

const getFeedBackControls = (designations) => {
	const designationOptions = getDesignations(designations);

	const control = {
		designation: {
			name           : 'designation',
			label          : 'Designation',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Designation',
			options        : designationOptions,
			span           : 6,
		},
		status: {
			name           : 'status',
			label          : 'Select Status',
			type           : 'select',
			defaultOptions : true,
			isClearable    : true,
			placeholder    : 'Status',
			options        : [
				{ label: 'Pending', value: 'pending' },
				{ label: 'Submitted', value: 'submitted' },
			],
			span: 6,
		},
	};

	return control;
};

export default getFeedBackControls;
