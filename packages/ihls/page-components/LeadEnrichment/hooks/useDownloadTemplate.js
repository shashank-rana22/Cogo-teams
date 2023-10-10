import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useDownloadTemplate = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : 'get_user_template',
			method : 'get',
		},
		{ manual: true },
	);

	const downloadTemplate = async () => {
		try {
			const res = await trigger();
			const { data: { template_url } } = res || {};
			if (template_url) window.open(template_url);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Download');
		}
	};

	return {
		loading,
		downloadTemplate,
	};
};

export default useDownloadTemplate;
