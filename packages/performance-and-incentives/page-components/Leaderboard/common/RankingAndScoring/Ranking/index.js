import { isEmpty, startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Ranking(props) {
	const { rankData } = props;

	return (
		<div className={styles.ranking_container}>
			<h3>Ranking</h3>

			{isEmpty(rankData) ? (
				<div className={styles.empty_text}>
					No ranking exists for Cogo India. Click on a User/Team from the
					leaderboard to view Scoring Analytics
				</div>
			) : (
				Object.entries(rankData)?.map(([label, value]) => {
					const { current_user_rank, total_report_count } = value || {};

					if (isEmpty(value)) return null;

					return (
						<div className={styles.rank_item} key={label}>
							<h3 className={styles.rank_data}>
								{current_user_rank}
								{' '}
								/
								{' '}
								{total_report_count}
							</h3>
							<p className={styles.label}>{startCase(label)}</p>
						</div>
					);
				})
			)}
		</div>
	);
}

export default Ranking;
