import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateCycle({ getDunningList, setActionModal }) {
	const {
		profile,
	} = useSelector((state) => state);
	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning',
			method  : 'put',
			authKey : 'put_payments_dunning',
		},
		{ manual: true },
	);

	const updateCycle = async ({ id, formData }) => {
		const {
			scheduledHour, scheduledMinute, timezone, triggerType,
			frequency,
			weekDay,
			monthDay,
			oneTimeDate,
		} = formData || {};

		const isPeriodic = triggerType === 'PERIODIC';

		const oneTimeDateValue = !isPeriodic ? formatDate({
			date       : oneTimeDate,
			dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
			formatType : 'date',
		}) : undefined;

		try {
			await trigger({
				data: {
					id,
					updatedBy    : profile?.user?.id,
					triggerType  : triggerType || 'ONE_TIME',
					scheduleRule : {
						scheduleTime              : `${scheduledHour}:${scheduledMinute}`,
						scheduleTimeZone          : timezone,
						dunningExecutionFrequency : isPeriodic ? frequency : 'ONE_TIME',
						week                      : isPeriodic ? weekDay : undefined,
						dayOfMonth                : isPeriodic ? monthDay : undefined,
						oneTimeDate               : oneTimeDateValue,
					},
				},
			});
			Toast.success('Cycle Updated Successfully');
			setActionModal({});
			getDunningList();
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		data,
		loading,
		updateCycle,
	};
}

export default useUpdateCycle;
