function useCreateFaqPayload({ values, editorValue }) {
	const {
		question_abstract,
		tag_ids,
		topic_ids,
		audience_ids,
	} = values || {};

	const payload = {
		question_abstract,
		state   : 'draft',
		status  : 'active',
		tag_ids,
		topic_ids,
		audience_ids,
		answers : [{
			answer : editorValue,
			state  : 'draft',
			status : 'active',
		}],
	};

	return {
		payload,
	};
}

export default useCreateFaqPayload;
