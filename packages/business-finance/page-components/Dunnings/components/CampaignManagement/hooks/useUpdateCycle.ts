import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

function useUpdateCycle({ getDunningList }) {
	const {
		profile,
	} = useSelector((state:any) => state);
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
		try {
			await trigger({
				data: {
					id,
					updatedBy    : profile?.user?.id,
					scheduleRule : {
						scheduleTime              : `${scheduledHour}:${scheduledMinute}`,
						scheduleTimeZone          : timezone,
						dunningExecutionFrequency : triggerType === 'PERIODIC' ? frequency : 'ONE_TIME',
						week                      : weekDay || undefined,
						dayOfMonth                : monthDay || undefined,
						oneTimeDate               : triggerType !== 'PERIODIC' ? oneTimeDate : undefined,
					},
				},
			});
			Toast.success('Cycle Updated Successfully');
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
