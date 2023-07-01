import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useUpdateAudience({ fetchFaqAudience }) {
	const [showPopOver, setShowPopOver] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_faq_audience',
		method : 'POST',
	}, { manual: true });

	const onClickDeleteIcon = async (item) => {
		try {
			const res = await trigger({
				data: {
					id     : item.id,
					status : 'inactive',
				},
			});

			if (res?.data) {
				Toast.success('Audience deleted sucessfully');
				setShowPopOver(null);
				fetchFaqAudience();
			}
		} catch (err) {
			if (err.response?.data) { Toast.error(getApiErrorString(err.response?.data)); }
		}
	};

	const onClickRestore = async (item) => {
		try {
			const res = await trigger({
				data: {
					id     : item?.id,
					status : 'active',
				},
			});

			if (res?.data) {
				Toast.success('Audience Restored sucessfully');
				fetchFaqAudience();
			}
		} catch (err) {
			if (err.response?.data) { Toast.error(getApiErrorString(err.response?.data)); }
		}
	};

	return {
		onClickDeleteIcon,
		loading,
		showPopOver,
		setShowPopOver,
		onClickRestore,
	};
}
export default useUpdateAudience;
