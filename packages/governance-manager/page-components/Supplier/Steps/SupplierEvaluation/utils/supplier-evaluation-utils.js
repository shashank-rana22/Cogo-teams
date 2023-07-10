import { Button } from '@cogoport/components';

import styles from '../styles.module.css';

export const filterData = (data) => {
	const A = data?.filter((item) => item?.task !== 'total_score');
	const B = data?.filter((item) => item?.task === 'total_score');
	return [...A, ...B];
};

export function columns({ setShow }) {
	return [
		{
			id       : 'parameters',
			Header   : () => (<div className={styles.th}>Parameters</div>),
			accessor : (row) => (<div className={styles.td}>{row.label}</div>),
		},
		{
			id       : 'total_score',
			Header   : () => (<div className={styles.th}>Total Score</div>),
			accessor : (row) => (<div className={styles.td}>{row.total_score}</div>),
		},
		{
			id       : 'score_received',
			Header   : () => (<div className={styles.th}>Score Received</div>),
			accessor : (row) => (
				<div className={styles.td}>
					<div>
						{
                    row?.score_received
                }
					</div>
					{
row?.evaluation_mode === 'manual' && row?.task !== 'total_score' && (
	<Button themeType="accent" size="sm" onClick={() => setShow(row)}>
		Score
	</Button>
)
                }
				</div>
			),
		},
	];
}
