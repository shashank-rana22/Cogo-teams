import { isEmpty } from '@cogoport/utils';

function useCreateFaqPayload({ values, editorValue, data }) {
	const {
		faq_topics = [], faq_audiences = [], faq_tags = [],
	} = data || {};

	const {
		question_abstract,
		tag_ids,
		topic_ids,
		audience_ids,
	} = values || {};

	const getTopicIds = (faq_topics || []).map(
		(item) => item?.id,
	);
	const getTagIds = (faq_tags || []).map(
		(item) => item?.id,
	);
	const getAudienceIds = (faq_audiences || []).map(
		(item) => item?.id,
	);

	const inactive_topic_ids = (getTopicIds || []).filter(
		(id) => !(topic_ids || []).includes(id),
	);

	const inactive_tag_ids = (getTagIds || []).filter(
		(id) => !(tag_ids || []).includes(id),
	);
	const inactive_audience_ids = (getAudienceIds || []).filter(
		(id) => !(audience_ids || []).includes(id),
	);

	const payload = {
		question_abstract,
		state              : 'draft',
		status             : 'active',
		tag_ids,
		topic_ids,
		inactive_topic_ids : !isEmpty(inactive_topic_ids) ? inactive_topic_ids : undefined,
		inactive_tag_ids   : !isEmpty(inactive_tag_ids) ? inactive_tag_ids : undefined,
		answers            : [{
			answer                : editorValue,
			state                 : 'draft',
			status                : 'active',
			audience_ids,
			inactive_audience_ids : !isEmpty(inactive_audience_ids) ? inactive_audience_ids : undefined,

		}],
	};

	return {
		payload,
	};
}

export default useCreateFaqPayload;
