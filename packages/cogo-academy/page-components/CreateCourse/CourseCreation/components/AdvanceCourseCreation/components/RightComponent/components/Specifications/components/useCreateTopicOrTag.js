import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useCreateTopicOrTag = ({ setShow, from = '' }) => {
	const [{ loading }, trigger] = useRequest({
		url    : from === 'topics' ? '/create_faq_topic' : '/create_faq_tag',
		method : 'POST',
	}, { manual: true });

	const KEY_MAPPING = {
		topics : 'topic_type',
		tags   : 'tag_type',
	};

	const createTopicOrTag = async ({ values }) => {
		try {
			await trigger({ data: { ...values, status: 'active', [KEY_MAPPING[from]]: 'cogo_academy_course' } });

			setShow(false);
		} catch (error) {
			Toast.error(getApiErrorString(error.response?.data));
		}
	};

	return {
		createTopicOrTag,
		loading,
	};
};

export default useCreateTopicOrTag;
