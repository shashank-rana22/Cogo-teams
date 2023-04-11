import { isEmpty } from '@cogoport/utils';

function useCreateFaqPayload({ values, editorValue, data, showAlias }) {
	const {
		faq_topics = [], faq_audiences = [], faq_tags = [], answers = [],
	} = data || {};

	const {
		question_abstract,
		tag_ids,
		topic_ids,
		audience_ids,
	} = values || {};

	// const questionAlias =

	const aliasesArray = (showAlias || []).map((alias) => (alias?.question_abstract));

	const updatedAlias = [];

	(showAlias || []).forEach((ele, index) => {
		const { id = '', question_abstract:alias_question_abstract = '', status } = ele || {};

		const filteredId = id !== index ? id : undefined;
		const obj = {
			id     : filteredId,
			alias_question_abstract,
			status : status || undefined,
		};

		if (obj[id] === undefined) {
			delete obj[id];
		}
		updatedAlias.push(obj);
	});

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
		aliases            : isEmpty(data) ? aliasesArray : updatedAlias,
		topic_ids,
		inactive_topic_ids : !isEmpty(inactive_topic_ids) ? inactive_topic_ids : undefined,
		inactive_tag_ids   : !isEmpty(inactive_tag_ids) ? inactive_tag_ids : undefined,
		answers            : [{
			id                    : answers?.[0]?.id || undefined,
			answer                : editorValue.toString('html'),
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
