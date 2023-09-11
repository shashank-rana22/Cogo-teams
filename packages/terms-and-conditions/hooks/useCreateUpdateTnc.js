import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import getCreateUpdateTncPayload from '../helpers/getCreateUpdateTncPayload';
import toastApiError from '../utlis/toastApiError';

const useCreateUpdateTnc = (
	action = 'create',
	refetch = () => {},
	editFormValue = null,
	setEditTncModalId = () => {},
	organizationId = null,
	setShowModal = () => {},
) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const isUpdatable = action === 'update';

	const apiName = isUpdatable
		? 'update_terms_and_condition'
		: 'create_terms_and_condition';
	const [{ loading }, trigger] = useRequest({ method: 'post', scope, url: `/${apiName}` });

	const onSubmit = async (values = {}) => {
		try {
			const payload = getCreateUpdateTncPayload({ values, editFormValue, organizationId });
			await trigger({
				data: payload,
			});

			Toast.success(`Terms And Conditions ${editFormValue?.id ? 'Updated' : 'Created'} Successfully`);
			setEditTncModalId(null);
			setShowModal(false);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		onSubmit,
		loading,
	};
};

export default useCreateUpdateTnc;
