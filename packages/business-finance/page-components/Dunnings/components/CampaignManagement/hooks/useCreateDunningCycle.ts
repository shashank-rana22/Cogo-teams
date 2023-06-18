import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCreateDunningCycle = ({
	formData,
	uncheckedRows, setShowCreateForm, getDunningList,
}) => {
	const {
		profile,
	} = useSelector((state:any) => state);

	const {
		cycleName,
		cycleType,
		severityLevel,
		templateData,
		ageingBucket,
		cogoEntityDetails,
		creditController,
		totalDueOutstanding,
		serviceType,
		triggerType,
		frequency,
		time,
		timezone,
		weekDay,
		monthDay,
		oneTimeDate,
	} = formData || {};

	const formattedTime = formatDate({
		date       : time,
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
		formatType : 'time',
	});

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
					triggerType,
					scheduleType                 : triggerType === 'PERIODIC' ? frequency : 'ONE_TIME',
					severityLevel,
					templateId                   : templateData?.id,
					category                     : 'CYCLE',
					isActive                     : true,
					createdBy                    : profile?.user?.id,
					exceptionTradePartyDetailIds : uncheckedRows,
					filters                      : {
						ageingBucket,
						cogoEntityId           : JSON.parse(cogoEntityDetails || '{}')?.id || undefined,
						creditControllerIds    : creditController || undefined,
						totalDueOutstanding,
						dueOutstandingCurrency : JSON.parse(cogoEntityDetails || '{}')?.currency || undefined,
						serviceTypes           : serviceType?.length > 0 ? serviceType : undefined,
					},
					scheduleRule: {
						scheduleTime              : formattedTime || '00:00',
						scheduleTimeZone          : timezone,
						dunningExecutionFrequency : triggerType === 'PERIODIC' ? frequency : 'ONE_TIME',
						week                      : weekDay || undefined,
						dayOfMonth                : monthDay || undefined,
						oneTimeDate               : triggerType === 'PERIODIC' ? oneTimeDate : undefined,
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
	};
};

export default useCreateDunningCycle;
