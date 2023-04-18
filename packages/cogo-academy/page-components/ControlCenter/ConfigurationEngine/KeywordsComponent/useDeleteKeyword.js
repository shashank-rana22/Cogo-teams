import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

function useDeleteKeyword({ fetchFaqKeyword }) {
	const [showPopOver, setShowPopOver] = useState(null);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_faq_keyword',
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
				Toast.success('Keyword deleted sucessfully');
				setShowPopOver(null);
				fetchFaqKeyword();
			}
		} catch (err) {
			if (err.response?.data) { Toast.error(getApiErrorString(err.response?.data)); }
		}
	};

	const onClickRestore = async ({ id }) => {
		try {
			const payload = {
				id,
				status: 'active',
			};

			await trigger({
				data: payload,
			});

			fetchFaqKeyword();
			Toast.success('Keyword restored sucessfully!');
		} catch (error) {
			if (error.response?.data) { Toast.error(getApiErrorString(error.response?.data)); }
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
export default useDeleteKeyword;
