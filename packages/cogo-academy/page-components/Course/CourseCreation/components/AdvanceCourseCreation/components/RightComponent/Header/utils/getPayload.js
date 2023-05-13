function getPayload({ activeTab, values, id }) {
	switch (activeTab) {
		case 'specifications':

			return ({
				id,
				topic_ids : values.topics,
				tag_ids   : values.tags,
				course_objectives:
                (values.course_objectives || []).map((item) => item.objective),
			});

		case 'intended_learners':

			return ({
				id,
				audiences:
				(values.audiences || []).map((audience_id) => ({
					id: audience_id,
					is_mandatory:
					(values.mandatory_audiences || []).includes(audience_id),
				})),
				tag_ids: values.tags,
				course_objectives:
                (values.course_objectives || []).map((item) => item.objective),
			});

		default:
			return {};
	}
}

export default getPayload;
