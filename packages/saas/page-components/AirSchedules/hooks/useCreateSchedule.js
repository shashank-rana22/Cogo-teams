import { Toast } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import controls from '../utlis/search-control';

const useCreateSchedule = () => {
	const {
		user_id,
		organization_id,
		partner_id,
		organization_branch_id,
		scope,
	} = useSelector(({ profile, general }) => ({
		// organization_id        : profile.organization.id || null,
		partner_id             : profile.partner.id || null,
		user_id                : profile.user.id || null,
		organization_branch_id : general?.query?.branch_id || null,
		scope                  : general.scope,
	}));

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		scope,
		url    : '/create_saas_air_schedule_subscription',
	});

	const DEFAULT_VALUES = {};
	controls.forEach((ctrl) => {
		if (ctrl?.value) {
			DEFAULT_VALUES[ctrl.name] = ctrl.value;
		}
	});

	const { control, handleSubmit, watch } = useForm({
		defaultValues: DEFAULT_VALUES,
	});

	const createSchedule = async (origin, destination) => {
		try {
			let requestData = {};
			if (scope === 'partner') {
				requestData = {
					origin_airport_id      : origin,
					destination_airport_id : destination,
					performed_by_user_id   : user_id,
					partner_id,
				};
			} else {
				requestData = {
					origin_airport_id      : origin,
					destination_airport_id : destination,
					performed_by_user_id   : user_id,
					organization_id,
					organization_branch_id,
				};
			}

			const res = await trigger({
				data: requestData,
			});
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			const { data } = res;
			return data;
		} catch (err) {
			Toast.error(err?.message || 'Unable to create schedules. Please try again.');

			return null;
		}
	};

	return { loading, createSchedule, watch, control, controls, handleSubmit };
};

export default useCreateSchedule;
