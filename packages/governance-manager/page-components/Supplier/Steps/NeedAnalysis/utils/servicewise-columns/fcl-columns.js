import { Button, Tooltip } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';

export const fclColumns = ({ t, setShow, service_type, isForApproval }) => {
	const columns = 		[
		{
			Header   : t('supplier_page_need_analysis_table_fcl_origin_title'),
			accessor : (row) => (<div>{row?.expertise_data?.origin_name}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_fcl_destination_title'),
			accessor : (row) => (<div>{row?.expertise_data?.destination_name}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_fcl_current_supplier_total_count'),
			accessor : (row) => (<div>{row?.expertise_data?.current_supplier_count}</div>),
		},
		{
			Header   : t('supplier_page_need_analysis_table_fcl_volume_served'),
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
					{t('supplier_page_need_analysis_table_fcl_evaluate')}
				</Button>
			)
			,
		});
	} else {
		columns.push(
			{
				id     : 'service_requirement',
				Header : () => (
					<div style={{ textAlign: 'center' }}>
						{t('supplier_page_need_analysis_table_fcl_service_requirement')}
					</div>
				),
				accessor: (row) => (
					<div style={{ textAlign: 'center' }}>
						{row?.service_requirement === 'yes' ? <IcCFtick /> : <IcCFcrossInCircle />}
					</div>
				),
			},
		);
		columns.push(
			{
				Header   : 'Feedback',
				accessor : (row) => (
					<div>
						<Tooltip content={row?.feedback}>
							<Button size="sm" themeType="secondary">
								{t('supplier_page_need_analysis_table_fcl_view_btn')}
							</Button>
						</Tooltip>
					</div>
				),
			},
		);
	}
	return columns;
};
