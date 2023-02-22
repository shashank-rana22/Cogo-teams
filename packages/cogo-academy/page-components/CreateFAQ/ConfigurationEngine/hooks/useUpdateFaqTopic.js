import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import useGetFaqTopic from './useGetFaqTopic';

function useUpdateFaqTopic({ id }) {
	const { fetchFaqTopic = () => {} } = useGetFaqTopic();

	const [{ loading }, trigger] = useRequest({
		url    : '/update_faq_topic',
		method : 'POST',
	}, { manual: true });

	const updateFaqTopic = async (values) => {
		const { name, description } = values || {};
		try {
			const res = await trigger({
				data: {
					name,
					display_name: startCase(name),
					description,
					id,
				},
			});

			if (res?.data) {
				fetchFaqTopic(res?.data.id);
				Toast.success('Topic Updated sucessfully');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	return { updateFaqTopic, updateFaqTopicLoading: loading };
}
export default useUpdateFaqTopic;
