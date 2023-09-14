import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useExportData = () => {
	const { query } = useRouter();
	const [{ loading }, trigger] = useRequest({
		method : 'get',
		url    : '/export_tracking_data',
	}, { manual: true });

	const getTrackingData = async () => {
		try {
			const resp = await trigger({
				params: {
					organization_branch_id: query.branch_id,
				},
			});
			const { file_url } = resp?.data || {};
			window.open(file_url);
		} catch (err) {
			console.error(err);
		}
	};

	return {
		getTrackingData, loading,
	};
};

export default useExportData;
