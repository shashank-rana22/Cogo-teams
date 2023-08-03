import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useDeleteTag({ fetchFaqTag }) {
	const [showPopOver, setShowPopOver] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_faq_tag',
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
				Toast.success('Tag deleted sucessfully');
				setShowPopOver(null);
				fetchFaqTag();
			}
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		onClickDeleteIcon,
		loading,
		showPopOver,
		setShowPopOver,
	};
}
export default useDeleteTag;
