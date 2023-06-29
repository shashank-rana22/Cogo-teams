import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import CONSTANTS from '../constants/constants';

const useCreateOperators = ({
	setShow,
	refetch,
	setPage,
	setFinalList,
	page,
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/create_operators',
		method : 'POST',
	});

	const handleCreateOperators = async (value) => {
		let isNvocc;
		if (value.is_nvocc) {
			isNvocc = value.is_nvocc === 'true';
		}
		const data = {
			...value,
			logo_url : value.logo_url.finalUrl,
			is_nvocc : isNvocc,
			status   : 'active',
		};

		try {
			await trigger({ data });
			Toast.success('Operators Added Successfully');
			setFinalList([]);
			setShow(false);
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
		handleCreateOperators,
		loading,
	};
};
export default useCreateOperators;
