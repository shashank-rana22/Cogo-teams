import {
	useForm,
	useGetAsyncOptions,
	asyncFieldsLocations,
} from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { merge } from '@cogoport/utils';
import { useState } from 'react';

import getControls from '../config';

const useCreateSchedule = () => {
	const TWO_HUNDRED = 200;
	const { push } = useRouter();
	const { general, profile } = useSelector((state) => state);

	const [errorMessage, setErrorMessage] = useState(false);
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/create_saas_air_schedule_subscription',
	}, { manual: true });
	const { control, watch } = useForm();

	const formValues = watch();

	const airportOptions = useGetAsyncOptions(
		merge(asyncFieldsLocations(), {
			params: { filters: { type: ['airport'] } },
		}),
	);
	const fields = getControls({ airportOptions });

	const createSchedule = async (origin, destination) => {
		try {
			const requestData = {
				origin_airport_id      : origin,
				destination_airport_id : destination,
				performed_by_user_id   : profile.id,
				organization_id        : profile.organization.id,
				organization_branch_id : general?.query?.branch_id,
			};

			const res = await trigger({
				data: requestData,
			});

			const { data } = res;

			if (res?.status === TWO_HUNDRED) {
				push(
					'/saas/air-schedules/[schedule_id]?isFirstVisit=true',
					`/saas/air-schedules/${data.id}?isFirstVisit=true`,
				);
			}

			return data;
		} catch (err) {
			console.error(err?.message || 'Unable to create schedules. Please try again.');
			return {};
		}
	};
	const handleCreateSchedule = () => {
		if (formValues?.origin_airport === formValues?.destination_airport) {
			setErrorMessage((prev) => !prev);
			return;
		}
		createSchedule(
			formValues.origin_airport,
			formValues.destination_airport,
		);
	};

	return { loading, errorMessage, handleCreateSchedule, control, formValues, fields };
};

export default useCreateSchedule;
