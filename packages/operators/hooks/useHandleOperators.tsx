import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const useHandleOperators = ({
	item,
	edit,
	setShow,
	setEdit,
	refetch,
	setPage,
	setFinalList,
	page,
}) => {
	const api = edit ? '/update_operator' : '/create_operators';

	const [{ loading }, trigger] = useRequest({
		url    : `${api}`,
		method : 'POST',
	});

	const handleOperators = async (value) => {
		let isNvocc;
		if (value.is_nvocc) {
			isNvocc = value.is_nvocc === 'true';
		}
		const data = {
			id       : item?.id,
			...value,
			logo_url : value?.logo_url?.finalUrl,
			is_nvocc : isNvocc,
			status   : edit ? value?.status : 'active',
		};

		try {
			await trigger({ data });
			Toast.success(`Operators ${edit ? 'Updated' : 'Added'} Successfully`);
			setFinalList([]);
			setShow(false);
			setEdit(false);
			if (page === CONSTANTS.START_PAGE) {
				refetch();
			} else {
				setPage(CONSTANTS.START_PAGE);
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		handleOperators,
		loading,
	};
};
export default useHandleOperators;
