import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import {
	// asyncFieldsOrganizations,
	asyncFieldsOrganizationUser,
	asyncFieldsPartner,
	asyncFieldsPartnerUsers,
} from '@cogoport/forms/utils/getAsyncFields';
import { useRequest } from '@cogoport/request';

import getControls from '../utils/get-create-request-controls';
import SERVICE_TYPE_MAPPING from '../utils/service-type-details';
import getStakeholderTypeOptions from '../utils/stakeholder-options';

// Todo seperate it out in utils

const useSaveAllocationRequest = () => {
	// const { data } = props;

	const controls = getControls();

	const formProps = useForm({
		defaultValues: {
			service_type: 'organization',
		},
	});
	const {
		watch,
	} = formProps;

	const { service_type, organization_id, partner_id } = watch();

	const stakeholderTypeOptions = getStakeholderTypeOptions({ service_type }) || [];

	// Todo put below in a seperate hook
	// const orgOptions = useGetAsyncOptions({
	// 	...asyncFieldsOrganizations(),
	// 	initialCall: false,
	// });

	const orgUserOptions = useGetAsyncOptions({
		...asyncFieldsOrganizationUser(),
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
				organization_id,
			},
			pagination_data_required: false,
		},
	});

	const partnerOptions = useGetAsyncOptions({
		...asyncFieldsPartner(),
		initialCall: false,
	});

	const partnerUserOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status: 'active',
				partner_id,
			},
			pagination_data_required: false,
		},
	});

	const stakeholderOptions = useGetAsyncOptions({
		...asyncFieldsPartnerUsers(),
		initialCall : false,
		params      : {
			filters: {
				status               : 'active',
				partner_entity_types : ['cogoport'],
			},
			page_limit: 100,
		},
	});

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

	const controlNameOptionsMapping = {
		organization_id      : {}, // orgOptions,
		organization_user_id : orgUserOptions,
		partner_id           : partnerOptions,
		partner_user_id      : partnerUserOptions,
		stakeholder_type     : { options: stakeholderTypeOptions },
		stakeholder_id       : stakeholderOptions,
	};

	const modifiedControls = controls.map((control) => {
		const { name } = control;

		return {
			...control,
			...(name === 'organization_user_id' && {
				disabled: !organization_id,
			}),
			...(name === 'partner_user_id' && {
				disabled: !partner_id,
			}),
			...(controlNameOptionsMapping[name] || {}),
		};
	});

	const newControls = [];
	modifiedControls.forEach((control) => {
		if (SERVICE_TYPE_MAPPING[service_type]?.includes(control.name)) {
			newControls.push(control);
		}
	});

	return {
		onSave,
		loading,
		formProps,
		controls: newControls,
	};
};

export default useSaveAllocationRequest;
