import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const TOAST_MESSAGE = {
	cancelled : 'AWB Number is successfully deleted.',
	available : 'AWB Number is successfully recovered.',
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
			const { data = {} } = error;
			const { base = '' } = data || {};
			const cleanStr = base.replace(/Base/g, '');
			Toast.error(cleanStr || 'Unable to Update AWB Number');
		}
	};

	return {
		editAwbNumber,
		loading,
	};
};

export default useEditAwbNumber;
