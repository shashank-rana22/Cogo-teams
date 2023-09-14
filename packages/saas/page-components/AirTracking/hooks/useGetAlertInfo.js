import { useRequest } from '@/packages/request';

const MANUAL_CALL = {
	ocean : false,
	air   : true,
};

const useGetAlertInfo = ({ shipmentId = '', activeTab = 'ocean' }) => {
	const [{ data, loading }] = useRequest({
		method : 'get',
		url    : '/get_saas_container_alert',
		params : { saas_container_subscription_id: shipmentId },
	}, { manual: MANUAL_CALL[activeTab] });

	const [{ data: alertList, loading: alertListLoading }] = useRequest({
		method : 'get',
		url    : '/get_list_of_master_alerts',
	}, { manual: MANUAL_CALL[activeTab] });

	return {
		loading, data, alertList, alertListLoading,
	};
};

export default useGetAlertInfo;
