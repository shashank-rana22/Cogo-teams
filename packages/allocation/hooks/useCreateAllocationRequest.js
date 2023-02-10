import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import controls from '../utils/get-requests-create-controls';
import SERVICE_TYPE_MAPPING from '../utils/service-type-details';
import getStakeholderTypeOptions from '../utils/stakeholder-options';

const useCreateAllocationRequest = (props) => {
	const { onCloseModal, refetch } = props;

	const {
		profile: {
			partner: {
				id: partnerId = '',
			},
		},
	} = useSelector((rdxState) => rdxState);

	const formProps = useForm({
		defaultValues: {
			service_type: 'organization',
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

	const api = useRequest({
		url    : '/create_allocation_request',
		method : 'post',
	}, { manual: true });

	const [{ loading }, trigger] = api;

	const onSave = async (formValues, e) => {
		e.preventDefault();

		try {
			const payload = {
				service_type     : formValues.service_type,
				stakeholder_type : formValues.stakeholder_type,
				reason           : formValues.reason,
				service_id:
					formValues.service_type === 'organization'
						? formValues.organization_id
						: formValues.partner_id,
				service_user_id:
					formValues.service_type === 'organization'
						? formValues.organization_user_id
						: formValues.partner_user_id,
				stakeholder_id : formValues.stakeholder_id,
				partner_id     : partnerId,
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

	// Todo use useMemo
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
