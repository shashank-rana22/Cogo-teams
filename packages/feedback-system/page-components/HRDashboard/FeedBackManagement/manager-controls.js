import { useGetAsyncOptions } from '@cogoport/forms';

const getControls = () => {
	const partnerOptions = useGetAsyncOptions({
		endpoint    : 'list_partner_users',
		initialCall : false,
		params      : {
			filters: {
				reporting_level      : 0,
				reporting_manager_id : '7c6c1fe7-4a4d-4f3a-b432-b05ffdec3b44',
			},
		},
		valueKey : 'user_id',
		labelKey : 'name',
	});

	return {
		...partnerOptions,
		name           : 'manager_id',
		placeholder    : 'Search via name',
		type           : 'select',
		defaultOptions : true,
		isClearable    : true,
		span           : 12,
		validations    : [{ type: 'required', message: 'Required' }],
	};
};

export default getControls;
