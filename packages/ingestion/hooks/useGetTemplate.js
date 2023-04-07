import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useGetTemplate() {
	const [template, setTemplate] = useState('');

	const [{ loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'get_ingestion_file_template',
	}, { manual: true });

	const getTemplateCsv = async (type) => {
		try {
			const response = await trigger({ params: { service_type: type } });

			window.open(response?.data?.template_file_url, '_blank');
			setTemplate('');
		} catch (error) {
			Toast.error(error?.message);
		}
	};

	return {
		loading,
		getTemplateCsv,
		template,
		setTemplate,
	};
}

export default useGetTemplate;
