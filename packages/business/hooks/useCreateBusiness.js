import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getCreateBusinessPayload from '../helpers/getCreateBusinessPayload';
import toastApiError from '../utlis/toastApiError';

const useCreateBusiness = ({
	refetch = () => {},
}) => {
	const [{ loading }, trigger] = useRequest({ method: 'post', url: '/create_business_entity' });

	const apiTrigger = async (values = {}) => {
		try {
			const payload = getCreateBusinessPayload(values);
			await trigger({
				data: payload,
			});

			Toast.success('Business entity Created Successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		apiTrigger,
	};
};

export default useCreateBusiness;
