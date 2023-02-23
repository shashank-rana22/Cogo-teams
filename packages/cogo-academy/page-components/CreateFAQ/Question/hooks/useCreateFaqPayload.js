function useCreateFaqPayload({ values, editorValue }) {
	const {
		fieldArray,
		question_abstract,
		tag_ids,
		topic_ids,
	} = values || {};

	const audiences = [];

	fieldArray.map((element) => {
		const {
			cogo_entity = '',
			country_id = '',
			platform = '',
			functions = '',
			sub_functions = '',
			work_scopes = '',
		} = element;

		const audienceData = {
			cogo_entity_id    : cogo_entity,
			country_id,
			platform,
			auth_function     : functions,
			auth_sub_function : sub_functions,
			persona           : work_scopes,

		};
		audiences.push(audienceData);
		return audiences;
	});

	const payload = {
		question_abstract,
		state   : 'draft',
		status  : 'active',
		tag_ids,
		topic_ids,
		answers : [{
			answer : editorValue,
			state  : 'draft',
			status : 'active',
			audiences,
		}],
	};
	return { payload };
}

export default useCreateFaqPayload;
