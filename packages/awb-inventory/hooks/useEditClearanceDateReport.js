import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const TOAST_MESSAGE = {
	cancelled              : 'AWB Number is successfully deleted.',
	available_non_reserved : 'AWB Number is successfully recovered.',
	available_reserved     : 'AWB Number is successfully recovered.',
};

const { START_PAGE } = CONSTANTS;

const useEditClearanceDateReport = ({
	item = {},
	clearanceDateReport,
	setShowEdit = () => {},
	setPage,
	setFinalList,
	setQfilter,
	page,
}) => {
	const { id = '' } = item;
	const [{ loading }, trigger] = useRequest({
		url    : '/update_awb_inventory',
		method : 'POST',
	});

	const editClearanceDateReport = async (finalData) => {
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
					|| 'Successfully edited',
			);
			setFinalList([]);
			setQfilter('');
			setShowEdit(false);
			if (page === START_PAGE) {
				clearanceDateReport();
			} else {
				setPage(START_PAGE);
			}
		} catch (error) {
			const { data = {} } = error;
			const { base = '' } = data || {};
			const cleanStr = base.replace(/Base/g, '');
			Toast.error(cleanStr || 'Unable to Edit Clearance Report Details');
		}
	};

	return {
		editClearanceDateReport,
		loading,
	};
};

export default useEditClearanceDateReport;
