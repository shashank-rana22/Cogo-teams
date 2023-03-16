const feedbackDataColumns = {
	feedbacksByManager : ['name', 'cogo_id', 'rating', 'score', 'user_details'],
	userStats          : ['name', 'cogo_id', 'rating', 'month', 'designation', 'department', 'feedback'],
	allFeedbacks       : ['name', 'cogo_id', 'designation', 'manager', 'score', 'month', 'feedback'],
	submitFeedback     : ['name', 'cogo_id', 'designation', 'department', 'month', 'add-kpi'],
	managerAccordion   : ['team_count', 'pending_count', 'rating'],
	monthAccordion     : ['total_feedbacks', 'BelowAverage', 'Average', 'GoodPerforming'],
	monthWiseFeedbacks : ['name', 'cogo_id', 'rating', 'department', 'designation', 'view_form'],
	logModal           : ['name', 'designation', 'manager', 'rating', 'employee_status', 'add_log_arrow'],
	pipProbationList   : ['name', 'designation', 'manager', 'rating', 'employee_status', 'is_pip', 'action'],
};

export default feedbackDataColumns;
