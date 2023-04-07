import { Toast } from '@cogoport/components';
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
			console.log('err', err);
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
			Toast.error(error?.message);
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
