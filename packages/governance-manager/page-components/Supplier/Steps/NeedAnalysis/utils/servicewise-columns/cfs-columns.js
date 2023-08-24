import { Button } from '@cogoport/components';

export const cfsColumns = ({ t, setShow, service_type, isForApproval }) => {
	const columns = [
		{
			Header   : t('supplier_page_need_analysis_table_cfs_header'),
			accessor : (row) => (<div>{row?.expertise_data?.location_name}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_cfs_container_type'),
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_cfs_rate_provided'),
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_cfs_count_suppliers'),
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
	];
	if (!isForApproval) {
		columns.push({
			Header   : ' ',
			accessor : (row) => (
				<Button
					themeType="accent"
					onClick={() => setShow({ ...row, service_type })}
					disabled={row?.service_requirement}
				>
					{t('supplier_page_need_analysis_table_cfs_evaluate')}
				</Button>
			)
			,
		});
	}
	return columns;
};
