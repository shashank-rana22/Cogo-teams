/* eslint-disable consistent-return */
export const evaluationCriteriaDetails = ({ t, service }) => {
	if (['fcl_freight'].includes(service)) {
		return [
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_fcl_direct_approval_50_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_fcl_vendor_approval_50_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_fcl_direct_approval_40_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_fcl_gov_approval_40_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_fcl_direct_approval_below_40'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_fcl_gov_approval_below_40'),
			},
		];
	}
	if (['lcl_freight'].includes(service)) {
		return [
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_lcl_direct_approval_60_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_lcl_vendor_approval_60_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_lcl_direct_approval_50_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_lcl_gov_approval_50_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_lcl_direct_approval_below_40'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_lcl_gov_approval_below_40'),
			},
		];
	}

	if (['haulage_freight'].includes(service)) {
		return [

			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_haul_direct_approval_50_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_haul_vendor_approval_50_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_haul_direct_approval_40_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_haul_gov_approval_40_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_haul_direct_approval_below_40'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_haul_gov_approval_below_40'),
			},

		];
	}

	if (['fcl_customs',
		'lcl_customs',
		'air_customs'].includes(service)) {
		return [
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cha_direct_approval_50_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cha_vendor_approval_50_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cha_direct_approval_40_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cha_gov_approval_40_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cha_direct_approval_below_40'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cha_gov_approval_below_40'),
			},
		];
	}
	if (['fcl_cfs'].includes(service)) {
		return [
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cfs_direct_approval_50_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cfs_vendor_approval_50_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cfs_direct_approval_40_plus'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cfs_gov_approval_40_plus'),
			},
			{
				range : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cfs_direct_approval_below_40'),
				text  : t('supplier_page_supplier_evaluation_table_evaluation_criteria_cfs_gov_approval_below_40'),
			},

		];
	}
};
