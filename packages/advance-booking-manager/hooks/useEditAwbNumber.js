import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const TOAST_MESSAGE = {
	cancelled              : 'AWB Number is successfully deleted.',
	available_non_reserved : 'AWB Number is successfully recovered.',
	available_reserved     : 'AWB Number is successfully recovered.',
};

const { START_PAGE } = CONSTANTS;

const useEditAwbNumber = ({
	item = {},
	awbList,
	setShowEdit = () => {},
	setPage,
	setFinalList,
	setQfilter,
	setShowConfirm = () => {},
	page,
	changedStatus,
}) => {
	const { id = '' } = item;
	const [{ loading }, trigger] = useRequest({
		url    : '/update_awb_inventory',
		method : 'POST',
	});

	const editAwbNumber = async (finalData) => {
		const payload = {
			id,
			...finalData,
			status: changedStatus,
		};
		try {
			await trigger({
				data: payload,
			});
			Toast.success(
				TOAST_MESSAGE[finalData?.status]
					|| 'AWB Number is successfully updated.',
			);
			setShowConfirm(false);
			setFinalList([]);
			setQfilter('');
			setShowEdit(false);
			if (page === START_PAGE) {
				awbList();
			} else {
				setPage(START_PAGE);
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Unable to Update AWB Number');
		}
	};

	return {
		editAwbNumber,
		loading,
	};
};

export default useEditAwbNumber;
