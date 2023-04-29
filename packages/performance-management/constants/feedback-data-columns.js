const feedbackDataColumns = {
	feedbacksByManager : ['name', 'cogo_id', 'rating', 'score', 'view_form', 'user_details'],
	userStats          : ['name', 'cogo_id', 'rating', 'month', 'designation', 'department', 'feedback'],
	allFeedbacks       : ['name', 'cogo_id', 'designation', 'manager', 'score', 'month', 'feedback'],
	manualFeedbacks    : ['name', 'cogo_id', 'manager', 'month', 'add-kpi'],
	submitFeedback     : ['name', 'cogo_id', 'designation', 'department', 'month', 'add-kpi'],
	managerAccordion   : ['team_count', 'pending_count', 'rating'],
	monthAccordion     : ['total_feedbacks', 'BelowAverage', 'Average', 'GoodPerforming'],
	monthWiseFeedbacks : ['name', 'cogo_id', 'rating', 'department', 'designation', 'view_form'],
	logModal           : ['name', 'cogo_id', 'designation', 'manager', 'add_create_arrow'],
	pendingReviewsList : {
		pip       : ['name', 'designation', 'manager', 'status', 'progress', 'action', 'review'],
		probation : ['name', 'designation', 'manager', 'status', 'action', 'review'],
	},
	managerProbationList : ['name', 'designation', 'start_date', 'end_date', 'status', 'action'],
	uploadedFiles        : ['name', 'number_of_employees', 'start_date', 'upload_type',
		'uploaded_by', 'error_report', 'reupload', 'download_csv'],
	pipProbationList : ['name', 'designation', 'manager', 'status', 'start_date', 'end_date'],
	reAssignModal    : ['name', 'designation', 'manager'],
	employeeList     : ['name', 'cogo_id', 'department', 'designation', 'employment_status',
		'manager', 'reassign_manager'],
};

export default feedbackDataColumns;
