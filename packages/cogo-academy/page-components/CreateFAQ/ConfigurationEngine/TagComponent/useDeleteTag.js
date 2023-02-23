import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useDeleteTag({ fetchFaqTag }) {
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
				fetchFaqTag();
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	return { onClickDeleteIcon, loading };
}
export default useDeleteTag;
