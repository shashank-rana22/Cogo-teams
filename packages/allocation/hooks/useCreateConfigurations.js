import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

import getCreateConfigurationsControls from '../configurations/get-configurations-create-controls';

const useCreateConfigurations = ({
	viewType = '',
	item = {},
	setShow = () => {},
	listRefetch = () => {},
}) => {
	const [segment, setSegment] = useState();

	const apiName = viewType === 'create'
		? 'configuration' : 'configuration_attributes';

	const authkey = viewType === 'create'
		? 'post_allocation_configuration' : 'post_allocation_configuration_attributes';

	const [{ loading }, trigger] = useAllocationRequest({
		url    : `${apiName}`,
		method : 'POST',
		authkey,
	});

	const controls = getCreateConfigurationsControls({ setSegment });

	const formProps = useForm({
		defaultValues: {
			service_type      : item.service_type || 'organization',
			role_ids          : item.role_ids,
			user_ids          : item.user_ids,
			stakeholder_type  : item.stakeholder_type,
			segment_id        : item.segment_id,
			locking_criterion : item.locking_criterion,
			locking_period    : item.locking_period,
			cooling_period    : item.cooling_period,
			schedule_data     : {
				schedule_type  : item.schedule_type || 'daily',
				dates_of_month : item.days,
				days_of_week   : item.days,
			},
		},
	});

	const { reset, watch } = formProps;

	const roleIds = watch('role_ids');
	const watchServiceType = watch('service_type');

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (newControl.name === 'user_ids') {
			if (roleIds) {
				newControl = {
					...newControl,
					disabled : false,
					params   : {
						filters: {
							role_ids: roleIds,
						},
					},
				};
			}
		}

		if (newControl.name === 'segment_id') {
			newControl = {
				...newControl,
				params: {
					filters: {
						is_lead_user_segment: watchServiceType === 'lead_organization',
					},
				},
			};
		}

		return newControl;
	});

	const getDays = (scheduleData = {}) => {
		if (scheduleData.schedule_type === 'weekly') {
			return scheduleData.days_of_week;
		}

		if (scheduleData.schedule_type === 'monthly') {
			return scheduleData.dates_of_month;
		}

		return 1;
	};

	const onSubmit = async (values = {}) => {
		const scheduleData = { ...values.schedule_data };

		const propsForCreation = {
			...values,
			configuration_type   : 'custom',
			status               : 'draft',
			schedule_type        : scheduleData.schedule_type,
			days                 : getDays(scheduleData),
			is_lead_user_segment : values.service_type === 'lead_organization',

			...(values.user_ids?.length === 0 && {
				user_ids: undefined,
			}),
			segment_type: segment,
		};

		delete propsForCreation.schedule_data;

		try {
			const payload = {
				...(viewType === 'create' ? propsForCreation : { ...propsForCreation, id: item.id }),
			};

			await trigger({
				data: payload,
			});

			reset();

			setShow(false);

			listRefetch();

			Toast.success(`Configuration ${viewType}ed successfully`);
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		controls: mutatedControls,
		onSubmit,
		loading,
		formProps,
	};
};

export default useCreateConfigurations;
