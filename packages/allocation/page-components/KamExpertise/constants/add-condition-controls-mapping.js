const ADD_CONDITION_CONTROL_MAPPING = {
	absolute   : ['condition_type', 'score_type', 'score_on_completion', 'score_on_repetition', 'impact'],
	percentage : ['condition_type', 'score_type', 'milestones', 'impact'],
	tat        : ['condition_type', 'score_type', 'tat', 'impact'],
};

export default ADD_CONDITION_CONTROL_MAPPING;
