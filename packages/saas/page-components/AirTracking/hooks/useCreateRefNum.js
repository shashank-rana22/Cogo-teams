import { Toast } from '@cogoport/components';
import { useTranslation } from 'next-i18next';

const { useRequest } = require('@/packages/request');

const TRACKER_ID_KEY = {
	ocean : 'saas_container_subscription_ids',
	air   : 'saas_air_subscription_ids',
};

const useCreateRefNum = ({ shipmentId = '', refetchTrackerList, closeHandler, activeTab = 'ocean' }) => {
	const { t } = useTranslation(['common', 'airOceanTracking']);

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'update_external_reference_number',
	}, { manual: true });

	const createRefNumFn = async ({ data }) => {
		try {
			await trigger({
				data: {
					tracking_type             : activeTab,
					reference_number_mappings : [
						{
							reference_number            : data.referenceNo,
							[TRACKER_ID_KEY[activeTab]] : [shipmentId],
						},
					],
				},
			});
			Toast.success(t('airOceanTracking:tracking_updated_reference_number_toast'));
			refetchTrackerList();
			closeHandler();
		} catch (err) {
			console.error(err);
		}
	};

	const onSubmitHandler = (data) => {
		createRefNumFn({ data });
	};
	return {
		onSubmitHandler, loading,
	};
};

export default useCreateRefNum;
