const FIRST_INDEX = 1;

const getFieldControls = ({ index, selectedApi = {}, getValues = () => {}, source = 'create_resource' }) => {
	const validateUniqueFields = (val) => {
		const scopes = getValues('scopes') || [];

		if (val === '') {
			return 'Scope is required';
		}

		if (val === 'allowed' && scopes.length > FIRST_INDEX) {
			return 'Remove allowed scope if other scopes are required';
		}

		const existingScopeTypes = new Set();
		let hasDuplicate = false;

		for (let i = 0; i < scopes.length; i += FIRST_INDEX) {
			const scopeType = scopes[i].view_type;

			if (existingScopeTypes.has(scopeType)) {
				hasDuplicate = true;
				break;
			}
			existingScopeTypes.add(scopeType);
		}

		return !hasDuplicate || 'Each element must have unique field values';
	};

	return {
		name     : 'scopes',
		type     : 'fieldArray',
		controls : [
			{
				name    : `scopes[${index}].view_type`,
				key     : 'view_type',
				label   : 'Scope Type',
				type    : 'select',
				options : [
					{ label: 'Self', value: 'self' },
					{ label: 'Team', value: 'team' },
					{ label: 'Channel Partner', value: 'channel_partner' },
					{ label: 'Channel Partner Team', value: 'channel_partner_team' },
					{ label: 'Location', value: 'location' },
					{ label: 'Across All', value: 'across_all' },
					{ label: 'All', value: 'all' },
					{ label: 'Allowed', value: 'allowed' },
				],
				width    : '50%',
				disabled : source === 'update_resource' ? !selectedApi : false,
				rules    : { validate: validateUniqueFields },
			},
			{
				name     : `scopes[${index}].through_criteria`,
				key      : 'through_criteria',
				label    : 'Through Criteria',
				type     : 'creatable_multiselect',
				width    : '50%',
				disabled : source === 'update_resource' ? !selectedApi : false,
			},
		],
	};
};

export default getFieldControls;
