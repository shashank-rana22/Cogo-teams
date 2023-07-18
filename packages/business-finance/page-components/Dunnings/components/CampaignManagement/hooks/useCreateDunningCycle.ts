import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

interface StateInterface {
	profile?: {
		user?: {
			id?: string | number;
		};
	};
}

const useCreateDunningCycle = ({
	formData,
	uncheckedRows, setShowCreateForm, getDunningList,
}) => {
	const {
		profile,
	} = useSelector((state: StateInterface) => state);

	const {
		cycleName,
		cycleType,
		severityLevel,
		templateData,
		ageingBucket,
		creditController,
		totalDueOutstanding,
		serviceType,
		triggerType,
		frequency,
		scheduledHour,
		scheduledMinute,
		timezone,
		weekDay,
		monthDay,
		oneTimeDate,
		cogoEntityId,
		dueOutstandingCurrency,
	} = formData || {};

	const [
		{ data, loading },
		trigger,
	] = useRequestBf(
		{
			url     : '/payments/dunning/cycle',
			method  : 'post',
			authKey : 'post_payments_dunning_cycle',
		},
		{ manual: true },
	);

	const createDunningCycle = async () => {
		try {
			await trigger({
				data: {
					name                         : cycleName,
					cycle_type                   : cycleType,
					triggerType                  : triggerType || 'ONE_TIME',
					frequency                    : triggerType === 'PERIODIC' ? frequency : 'ONE_TIME',
					severityLevel,
					templateId                   : templateData?.id,
					category                     : 'CYCLE',
					isActive                     : true,
					createdBy                    : profile?.user?.id,
					exceptionTradePartyDetailIds : uncheckedRows,
					filters                      : {
						ageingBucket,
						cogoEntityId               : cogoEntityId || undefined,
						organizationStakeholderIds : creditController || undefined,
						totalDueOutstanding,
						dueOutstandingCurrency     : dueOutstandingCurrency || undefined,
						serviceTypes               : !isEmpty(serviceType) ? serviceType : undefined,
					},
					scheduleRule: {
						scheduleTime              : `${scheduledHour}:${scheduledMinute}`,
						scheduleTimeZone          : timezone,
						dunningExecutionFrequency : triggerType === 'PERIODIC' ? frequency : 'ONE_TIME',
						week                      : weekDay || undefined,
						dayOfMonth                : monthDay || undefined,
						oneTimeDate               : triggerType !== 'PERIODIC' ? oneTimeDate : undefined,
					},
				},
			});
			Toast.success('Dunning Cycle Successfully Created');
			getDunningList();
			setShowCreateForm(false);
		} catch (err) {
			Toast.error(err?.response?.data?.message || 'Something went wrong');
		}
	};

	return {
		createDunningCycle,
		loading,
		data,
	};
};

export default useCreateDunningCycle;
