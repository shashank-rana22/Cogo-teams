import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

import handleCopy from '../helpers/handleCopyUrl';

const useUpdateCheckout = ({ getCheckout, detail = {} }) => {
	const { query } = useSelector(({ general }) => ({
		query: general.query,
	}));

	const { checkout_id, shipment_id } = query || {};

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_checkout',
	}, { manual: true });

	const updateCheckout = async ({ values, closeFunction, stateValue = false, type = '' }) => {
		try {
			await trigger({ data: values });

			await getCheckout();

			if (closeFunction) {
				closeFunction(stateValue);
			}

			if (type === 'copy_link') {
				handleCopy({ detail, checkout_id, shipment_id });
			}
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		updateCheckout,
		updateLoading: loading,
	};
};

export default useUpdateCheckout;
