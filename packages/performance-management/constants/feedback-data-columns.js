const feedbackDataColumns = {
	feedbacksByManager : ['name', 'cogo_id', 'rating', 'score', 'user_details'],
	userStats          : ['name', 'cogo_id', 'rating', 'month', 'designation', 'department', 'feedback'],
	allFeedbacks       : ['name', 'cogo_id', 'designation', 'manager', 'score', 'month', 'feedback'],
	submitFeedback     : ['name', 'cogo_id', 'designation', 'department', 'month', 'add-kpi'],
	managerAccordion   : ['team_count', 'pending_count', 'rating'],
	monthAccordion     : ['total_feedbacks', 'BelowAverage', 'Average', 'GoodPerforming'],
	monthWiseFeedbacks : ['name', 'cogo_id', 'rating', 'department', 'designation', 'view_form'],
	logModal           : ['name', 'designation', 'manager', 'rating', 'employee_status', 'add_create_arrow'],
	pendingReviewsList : ['name', 'designation', 'manager', 'rating', 'update', 'logs', 'action'],
	uploadedFiles     	: ['name', 'number_of_employees', 'manager', 'start_date',
		'update', 'upload_type', 'action'],
	pipProbationList: ['name', 'designation', 'manager', 'rating', 'is_pip',
		'start_date', 'end_date', 'progress', 'logs', 'action'],
	reAssignModal      : ['name', 'designation', 'manager'],
};

export default feedbackDataColumns;
