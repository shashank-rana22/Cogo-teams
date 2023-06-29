import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const useCreateOperators = ({
	setEdit,
	refetch,
	item,
	setPage,
	setFinalList,
	page,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_operator',
		method : 'POST',
	});

	const handleEditOperators = async (value) => {
		const data = {
			id       : item.id,
			...value,
			logo_url : value?.logo_url?.finalUrl || undefined,
		};

		try {
			await trigger({ data });
			Toast.success('Operator Updated Successfully');
			setFinalList([]);
			setEdit(false);
			if (page === CONSTANTS.START_PAGE) {
				refetch();
			} else {
				setPage(CONSTANTS.START_PAGE);
			}
		} catch (error) {
			Toast.error(error?.data);
		}
	};

	return {
		handleEditOperators,
		loading,
	};
};
export default useCreateOperators;
