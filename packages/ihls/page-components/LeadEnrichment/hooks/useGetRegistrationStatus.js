import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useGetRegistrationStatus = ({ file_url }) => {
	const [{ loading, data }] = useRequest(
		{
			url    : 'get_registration_status',
			method : 'get',
			params : {
				file_url,
			},
		},
		{ manual: false },
	);

	const { file_url: url } = data || {};

	const downloadTemplate = () => {
		try {
			if (url) window.open(url);
		} catch (e) {
			Toast.error(e?.response?.data?.message || 'Failed to Download');
		}
	};

	return {
		loading,
		url,
		downloadTemplate,
	};
};

export default useGetRegistrationStatus;
