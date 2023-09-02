import { Button, Tooltip } from '@cogoport/components';
import { IcCFcrossInCircle, IcCFtick } from '@cogoport/icons-react';

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
	} else {
		columns.push(
			{
				id     : 'service_requirement',
				Header : () => (
					<div style={{ textAlign: 'center' }}>
						{t('supplier_page_need_analysis_table_cfs_service_requirement')}
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
								View
							</Button>
						</Tooltip>
					</div>
				),
			},
		);
	}
	return columns;
};
