import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const { START_PAGE } = CONSTANTS;

const useCreateAwbNumber = (
	setShow,
	awbList,
	setActiveTab,
	setPage,
	setFinalList,
	page,
) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_awb_inventory',
		method : 'POST',
	});

	const createAwbNumber = async (finalData) => {
		const payload = {
			status: 'available_non_reserved',
			...finalData,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success('AWB Number is successfully added.');
			setFinalList([]);
			setActiveTab('inventory_stock');
			setShow(false);
			if (page === START_PAGE) {
				awbList();
			} else {
				setPage(START_PAGE);
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Unable to Add AWB Number');
		}
	};

	return {
		createAwbNumber,
		loading,
	};
};

export default useCreateAwbNumber;
