import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import getCreateConfigurationsControls from '../utils/get-configurations-create-controls';

const useCreateConfigurations = ({
	viewType = '',
	item = {},
	setShow = () => {},
	listRefetch = () => {},
}) => {
	const [segment, setSegment] = useState();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_allocation_configuration',
		method : 'POST',
	});

	const controls = getCreateConfigurationsControls({ item, setSegment });

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

	const {
		reset,
		watch,
		// setValue,
	} = formProps;

	const roleIds = watch('role_ids');
	const watchServiceType = watch('service_type');

	// useEffect(() => {
	// 	console.log('Here');
	// 	setValue('user_ids', []);
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [roleIds]);

	const mutatedControls = controls.map((control) => {
		let newControl = { ...control };

		if (viewType === 'edit') {
			newControl = {
				...newControl,
				rules: {
					required: false,
				},
			};
		}

		// if (newControl.name === 'role_ids') {
		// 	newControl = {
		// 		...newControl,
		// 		handleChange: () => {
		// 			console.log('Here');
		// 			setValue('user_ids', []);
		// 		},
		// 	};
		// }

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

	const onCreate = async (values = {}) => {
		try {
			const scheduleData = { ...values.schedule_data };
			const payload = {
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
			delete payload.schedule_data;

			await trigger({
				data: payload,
			});

			reset();

			setShow(false);

			listRefetch();

			Toast.success('Configuration created successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	};

	return {
		controls      : mutatedControls,
		onCreate,
		loadingCreate : loading,
		formProps,
	};
};

export default useCreateConfigurations;
