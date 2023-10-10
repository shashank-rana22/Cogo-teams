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

	const [{ loading }, trigger] = useRequest(
		{
			method : 'post',
			url    : '/update_checkout',
		},
		{ manual: true },
	);

	const updateCheckout = async ({
		values = {},
		closeFunction = () => {},
		stateValue = false,
		type = '',
		refetchRequired = true,
		scrollToTop = false,
	}) => {
		try {
			if (type === 'copy_link') {
				const { hasError = false } = handleCopy({ detail, checkout_id, shipment_id });

				if (hasError) {
					return;
				}
			}

			await trigger({ data: values });

			if (refetchRequired) {
				await getCheckout();
			}

			if (scrollToTop) {
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
			}

			if (closeFunction) {
				closeFunction(stateValue);
			}

			Toast.success('Updated successfully');
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
