import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { startCase } from '@cogoport/utils';

import useGetFaqTopic from './useGetFaqTopic';

function useCreateFaqTopic() {
	const { fetchFaqTopic = () => {} } = useGetFaqTopic();

	const [{ loading }, trigger] = useRequest({
		url    : '/create_faq_topic',
		method : 'POST',
	}, { manual: true });

	const createFaqTopic = async (values) => {
		const { name, description } = values || {};
		try {
			const res = await trigger({
				data: {
					name,
					display_name: startCase(name),
					description,
				},
			});

			if (res?.data) {
				fetchFaqTopic(res?.data.id);
				Toast.success('Topic created sucessfully');
			}
		} catch (err) {
			Toast.error('Something went wrong');
		}
	};

	const onClickSaveButton = (values) => {
		createFaqTopic(values);
	};

	return { createFaqTopic, createFaqTopicLoading: loading, onClickSaveButton };
}
export default useCreateFaqTopic;
