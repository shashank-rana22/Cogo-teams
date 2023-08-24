import { Button } from '@cogoport/components';

export const trailerColumns = ({ t, setShow, service_type, isForApproval }) => {
	const columns = [
		{
			Header   : t('supplier_page_need_analysis_table_trailer_origin_title'),
			accessor : (row) => (<div>{row?.expertise_data?.origin_name}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_trailer_destination_title'),
			accessor : (row) => (<div>{row?.expertise_data?.destination_name}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_fcl_current_supplier_total_count'),
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_trailer_volume_served'),
			accessor : (row) => (<div>{row?.expertise_data?.total_volume_served?.total_teus}</div>),
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
					{t('supplier_page_need_analysis_table_trailer_evaluate')}
				</Button>
			)
			,
		});
	}
	return columns;
};
