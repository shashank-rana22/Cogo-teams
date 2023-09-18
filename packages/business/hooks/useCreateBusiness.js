import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getCreateBusinessPayload from '../helpers/getCreateBusinessPayload';
import toastApiError from '../utlis/toastApiError';

const useCreateBusiness = ({
	refetch = () => {},
}) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest({ method: 'post', scope, url: '/create_business_entity' });

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
