import { asyncFieldsOperators, asyncFieldsOrganizationUsers, useGetAsyncOptions } from '@cogoport/forms';

const useGetRevertFormAsyncOptions = ({ serviceProviderId }) => {
	const organizationUsers = useGetAsyncOptions({
		...asyncFieldsOrganizationUsers(),
		initialCall : true,
		params      : {
			filters: {
				status          : 'active',
				organization_id : serviceProviderId,

			},
		},
	});

	const shippingLines = useGetAsyncOptions({
		...asyncFieldsOperators(),
		params: {
			filters     : { operator_type: 'shipping_line', status: 'active' },
			page_limit  : 100,
			sort_by     : 'short_name',
			sort_type   : 'asc',
			initialCall : true,
		},
	});

	const airLines = useGetAsyncOptions({
		...asyncFieldsOperators(),
		params: {
			filters    : { operator_type: 'airline', status: 'active' },
			page_limit : 100,
			sort_by    : 'short_name',
			sort_type  : 'asc',
		},
	});

	return {
		airLines,
		shippingLines,
		organizationUsers,
	};
};

export default useGetRevertFormAsyncOptions;
