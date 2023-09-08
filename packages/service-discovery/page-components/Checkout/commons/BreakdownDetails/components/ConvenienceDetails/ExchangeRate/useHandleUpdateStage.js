import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useHandleUpdateStage = ({ refetch, detail }) => {
	const [value, setValue] = useState(detail?.applicable_state || '');

	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_checkout',
	}, { manual: true });

	const handleUpdateStage = async ({ selectedValue, setShowPopover }) => {
		try {
			await trigger({
				params: { applicable_state: selectedValue, id: detail?.id },
			});

			setShowPopover(false);
			setValue(selectedValue);
			Toast.success('updated succesfully');
			refetch();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		handleUpdateStage,
		value,
		loading,
	};
};

export default useHandleUpdateStage;
