import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import getUpdateTncPayload from '../helpers/getCreateUpdateTncPayload';
import toastApiError from '../utlis/toastApiError';

const useUpdateTnc = ({
	refetch = () => {},
	organizationId = null,
}) => {
	const [{ loading }, trigger] = useRequest({ method: 'post', url: '/update_terms_and_condition' });

	const apiTrigger = async ({ values = {}, editFormValue = {} }) => {
		try {
			const payload = getUpdateTncPayload({ values, editFormValue, organizationId });
			await trigger({
				data: payload,
			});

			Toast.success('Terms And Conditions Updated Successfully');
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		apiTrigger,
		loading,
	};
};

export default useUpdateTnc;
