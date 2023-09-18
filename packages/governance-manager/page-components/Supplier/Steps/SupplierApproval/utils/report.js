export 	const report = ({ t, service_type }) => {
	const needAnlysis = {
		title : t('supplier_page_supplier_approval_report_need_analysis_label'),
		type  : 'need_analysis_report',
	};
	const marketFeedback = 		{
		title : t('supplier_page_supplier_approval_report_market_feedback_label'),
		type  : 'market_feedback_report',
	};

	const evaulatinparameter =	{
		title : t('supplier_page_supplier_approval_report_evaluation_parameter_label'),
		type  : 'evaluation_paramenter_report',
	};

	const dueDilligence = 		{
		title : t('supplier_page_supplier_approval_report_financial_due_diligence_label'),
		type  : 'financial_due_diligence_report',
	};

	if (service_type === 'fcl_cfs') {
		return [
			needAnlysis,
			evaulatinparameter,
			dueDilligence];
	}

	return [
		needAnlysis,
		marketFeedback,
		evaulatinparameter,
		dueDilligence];
};
