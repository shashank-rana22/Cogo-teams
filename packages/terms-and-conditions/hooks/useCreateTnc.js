import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getCreateUpdateTncPayload from '../helpers/getCreateUpdateTncPayload';
import toastApiError from '../utlis/toastApiError';

const useCreateTnc = ({
	refetch = () => {},
	organizationId = null,
}) => {
	const [{ loading }, trigger] = useRequest({ method: 'post', url: '/create_terms_and_condition' });

	const apiTrigger = async ({ values = {}, editFormValue = {} }) => {
		try {
			const payload = getCreateUpdateTncPayload({ values, editFormValue, organizationId });
			await trigger({
				data: payload,
			});
			Toast.success('Terms And Conditions Created Successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		apiTrigger,
		createLoading: loading,
	};
};

export default useCreateTnc;
