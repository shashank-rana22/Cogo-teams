import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useMemo } from 'react';

import getControls from '../utils/get-create-request-controls';
import SERVICE_TYPE_MAPPING from '../utils/service-type-details';
import getStakeholderTypeOptions from '../utils/stakeholder-options';

const useSaveAllocationRequest = () => {
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

	const filteredControls = useMemo(() => {
		const controlNames = SERVICE_TYPE_MAPPING[service_type] || [];

		return controls.filter((control) => controlNames.includes(control.name)).map((control) => {
			const { name = '' } = control;

			return {
				...control,
				...(name === 'organization_user_id' && {
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
					disabled : !partner_id,
					params   : {
						filters: {
							status: 'active',
							partner_id,
						},
						pagination_data_required: false,
					},
				}),
				...(name === 'stakeholder_type' && {
					options: stakeholderTypeOptions,
				}),
			};
		});
	}, [service_type]);

	return {
		onSave,
		loading,
		formProps,
		controls: filteredControls,
	};
};

export default useSaveAllocationRequest;
