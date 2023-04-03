import { useRequest } from '@cogoport/request';

function useGetTemplate() {
	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'get_ingestion_file_template',
	}, { manual: true });

	const getTemplateCsv = async (e) => {
		// console.log('params', { service_type: e });
		const response = await trigger({ service_type: e });

		// eslint-disable-next-line no-undef
		window.open(response?.data, '_blank');
	};

	return {
		url: data,
		loading,
		getTemplateCsv,
	};
}

export default useGetTemplate;
