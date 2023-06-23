import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

interface Props {
	getDunningList?: Function;
	setActionModal?: Function;
}

interface StateInterface {
	profile?: {
		user?: {
			id?: string | number;
		};
	};
}

function useUpdateCycle({ getDunningList, setActionModal }:Props) {
	const {
		profile,
	} = useSelector((state: StateInterface) => state);
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
					triggerType  : triggerType || 'ONE_TIME',
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
