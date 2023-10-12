import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreateServetalAgent = ({ listServetalAgent = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_servetel_agent',
		method : 'POST',
	}, { manual: true });

	const servetalAgent = async ({ payload = {} }) => {
		try {
			await trigger({
				data: payload,
			});
			listServetalAgent();
			Toast.success('Agent Added Successfully');
		} catch (error) {
			toastApiError(error);
		}
	};
	return {
		servetalAgent,
		createServetalAgentloading: loading,
	};
};
export default useCreateServetalAgent;
