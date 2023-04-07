import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useGetTemplate() {
	const [{ loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'get_ingestion_file_template',
	}, { manual: true });

	const getTemplateCsv = async (type) => {
		try {
			const response = await trigger({ params: { service_type: type } });

			window.open(response?.data?.template_file_url, '_blank');
		} catch (error) {
			Toast.error('error');
		}
	};

	return {
		loading,
		getTemplateCsv,
	};
}

export default useGetTemplate;
