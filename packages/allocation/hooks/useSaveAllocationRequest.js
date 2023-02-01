import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { asyncFieldsOrganizations, asyncFieldsOrganizationUser } from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';

const getControls = ({ orgOptions, orgUserOptions }) => [
	{
		name    : 'service_type',
		type    : 'radioGroup',
		label   : 'Allocation Type',
		value   : 'organization',
		options : [
			{
				value : 'organization',
				label : 'Organization',
			},
			{
				value : 'partner',
				label : 'Partner',
			},
		],
		rules: { required: true },
	},
	{
		...orgOptions,
		name           : 'organization_id',
		type           : 'select',
		label          : 'Organization',
		placeholder    : 'Select Organization',
		defaultOptions : false,
		rules          : { required: true },
	},
	{
		...orgUserOptions,
		name           : 'organization_user_id',
		type           : 'select',
		label          : 'Organization User',
		placeholder    : 'Select Organization User',
		defaultOptions : false,
		// disabled       : true,
		rules          : { required: true },
		// params         : {
		// 	filters                  : {},
		// 	pagination_data_required : false,
		// },
	},
	{ // only for partner
		name           : 'partner_id',
		type           : 'select',
		label          : 'Partner',
		placeholder    : 'Select Partner',
		defaultOptions : false,
		optionsListKey : 'partners',
		span           : 6,
		disabled       : false,
		rules          : { required: true },
	},
	{ // only for partner
		name           : 'partner_user_id',
		type           : 'select',
		label          : 'Partner User',
		optionsListKey : 'partner-users',
		disabled       : true,
		placeholder    : 'Select Partner User',
		defaultOptions : false,
		span           : 6,
		valueKey       : 'user_id',
		rules          : { required: true },
		params         : {
			filters: {},
		},
	},
	{
		name           : 'stakeholder_type',
		label          : 'Stakeholder Type',
		placeholder    : 'Select Stakeholder Type',
		type           : 'multiSelect',
		isClearable    : true,
		span           : 6,
		defaultOptions : false,
		rules          : {
			required: true,
		},
	},
	{
		name           : 'stakeholder_id',
		type           : 'select',
		label          : 'Stakeholder',
		optionsListKey : 'partner-users',
		placeholder    : 'Select Stakeholder',
		defaultOptions : false,
		span           : 6,
		valueKey       : 'user_id',
		rules          : { required: true },
		params         : {
			filters: {
				partner_entity_types: ['cogoport'],
			},
		},
	},
	{
		name        : 'reason',
		label       : 'Request Reason',
		placeholder : 'Type here...',
		type        : 'text',
		span        : 6,
		rules       : {
			required: true,
		},
	},
];

const useSaveAllocationRequest = () => {
	// const { data } = props;

	const orgOptions = useGetAsyncOptions({
		...asyncFieldsOrganizations(),
	});

	const orgUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
	});

	const controls = getControls({ orgOptions, orgUserOptions });

	const formProps = useForm();

	const api = useRequest({
		url    : '/create_allocation_request',
		method : 'post',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const onSave = async (formValues, e) => {
		e.preventDefault();

		try {
			const payload = {};

			await trigger({ data: payload });

			// close modal and refetch
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.data)
					|| 'Unable to Save, Please try again!!',
			);
		}
	};

	return {
		onSave,
		loading,
		formProps,
		controls,
	};
};

export default useSaveAllocationRequest;
