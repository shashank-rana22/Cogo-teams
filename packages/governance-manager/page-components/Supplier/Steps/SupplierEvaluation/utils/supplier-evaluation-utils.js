import { Button } from '@cogoport/components';

import styles from '../styles.module.css';

export const filterData = (data) => {
	const A = data?.filter((item) => item?.task !== 'total_score');
	const B = data?.filter((item) => item?.task === 'total_score');
	return [...A, ...B];
};

export function columns({ t, setShow, isForApproval }) {
	const column = [
		{
			id     : 'parameters',
			Header : () => (
				<div className={styles.th}>
					{t('supplier_page_supplier_evaluation_table_evaluation_criteria_utils_parameter')}
				</div>
			),
			accessor: (row) => (<div className={styles.td}>{row.label}</div>),
		},
		{
			id     : 'total_score',
			Header : () => (
				<div className={styles.th}>
					{t('supplier_page_supplier_evaluation_table_evaluation_criteria_utils_total_score')}
				</div>
			),
			accessor: (row) => (<div className={styles.td}>{row.total_score}</div>),
		},
		{
			id     : 'score_received',
			Header : () => (
				<div className={styles.th}>
					{t('supplier_page_supplier_evaluation_table_evaluation_criteria_utils_score_rec')}
				</div>
			),
			accessor: (row) => (
				<div className={styles.td}>
					<div>
						{
                    row?.score_received
                }
					</div>
					{
						row?.evaluation_mode === 'manual' && row?.task !== 'total_score' && !isForApproval && (
							<Button themeType="accent" size="sm" onClick={() => setShow(row)}>
								{t('supplier_page_supplier_evaluation_table_evaluation_criteria_utils_score')}
							</Button>
						)
                }
				</div>
			),
		},
	];
	return column;
}
