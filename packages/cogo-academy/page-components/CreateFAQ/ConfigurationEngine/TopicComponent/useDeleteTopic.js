import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

function useDeleteTopic({ fetchFaqTopic }) {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_faq_topic',
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
				Toast.success('Topic deleted sucessfully');
				fetchFaqTopic();
			}
		} catch (err) {
			console.log('err', err);
		}
	};

	return { onClickDeleteIcon, loading };
}
export default useDeleteTopic;
