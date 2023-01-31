import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const controls = [
	{
		name    : 'service_type',
		type    : 'radio',
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
		name           : 'organization_id',
		type           : 'select',
		label          : 'Organization',
		placeholder    : 'Select Organization',
		defaultOptions : false,
		endpoint       : 'organizations',
		span           : 6,
		disabled       : false,
		rules          : { required: true },
	},
	{
		name           : 'organization_user_id',
		type           : 'select',
		label          : 'Organization User',
		placeholder    : 'Select Organization User',
		defaultOptions : false,
		disabled       : true,
		optionsListKey : 'organization-users',
		valueKey       : 'user_id',
		rules          : { required: true },
		params         : {
			filters                  : {},
			pagination_data_required : false,
		},
	},

	{
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

	{
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

	const controlsWithValue = controls.map((control) => ({
		...control,
		// value: data[control.name],
	}));

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
		controls: controlsWithValue,
	};
};

export default useSaveAllocationRequest;
