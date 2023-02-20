import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import controls from '../configurations/get-requests-create-controls';
import SERVICE_TYPE_MAPPING from '../configurations/service-type-details';
import getStakeholderTypeOptions from '../configurations/stakeholder-options';

const useCreateAllocationRequest = (props) => {
	const { onCloseModal, refetch, params } = props;

	const {
		profile: {
			partner: {
				id: partnerId = '',
			},
		},
	} = useSelector((rdxState) => rdxState);

	const formProps = useForm({
		defaultValues: {
			service_type: params.filters?.service_type || 'organization',
		},
	});
	const { watch, setValue } = formProps;

	const { service_type, organization_id, partner_id :servicePartnerId } = watch();

	useEffect(() => {
		setValue('organization_user_id', '');
		setValue('partner_user_id', '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [service_type, organization_id, servicePartnerId]);

	const stakeholderTypeOptions = getStakeholderTypeOptions({ service_type }) || [];

	const api = useAllocationRequest({
		url     : '/request',
		method  : 'post',
		authkey : 'post_allocation_request',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const onSave = async (formValues, e) => {
		e.preventDefault();

		const {
			service_type:serviceType,
			stakeholder_type,
			reason,
			organization_id : orgId,
			partner_id: partnerIdFromForm,
			organization_user_id,
			partner_user_id,
			stakeholder_id,
		} = formValues || {};

		try {
			const payload = {
				service_type: serviceType,
				stakeholder_type,
				reason,
				service_id:
				serviceType === 'organization'
					? orgId
					: partnerIdFromForm,
				service_user_id:
					serviceType === 'organization'
						? organization_user_id
						: partner_user_id,
				stakeholder_id,
				partner_id: partnerId,
			};

			await trigger({ data: payload });

			onCloseModal();
			refetch();
			Toast.success('Request created successfully');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data)
					|| 'Unable to Save, Please try again!!',
			);
		}
	};

	const controlNames = SERVICE_TYPE_MAPPING[service_type] || [];

	const filteredControls = controls.filter((control) => controlNames.includes(control.name)).map((control) => {
		const { name = '' } = control;

		return {
			...control,
			...(name === 'organization_user_id' && {
				fieldKey : organization_id,
				disabled : !organization_id,
				params   : {
					filters: {
						status: 'active',
						organization_id,
					},
					pagination_data_required: false,
				},
			}),
			...(name === 'partner_user_id' && {
				disabled : !servicePartnerId,
				params   : {
					filters: {
						status     : 'active',
						partner_id : servicePartnerId,
					},
					pagination_data_required: false,
				},
			}),
			...(name === 'stakeholder_type' && {
				options: stakeholderTypeOptions,
			}),
		};
	});

	return {
		onSave,
		loading,
		formProps,
		controls: filteredControls,
	};
};

export default useCreateAllocationRequest;
