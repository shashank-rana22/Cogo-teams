import { ProgressBar } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import styles from './styles.module.css';
import useGetQuestWinner from './useGetQuestWinner';
import WinnerLoader from './WinnerLoader';

const RATIO_COLOR_MAPPING = {
	complete : '#849E4C',
	medium   : '#f68b21',
	low      : '#EE3425',
};

const THRESHOLD = 1 / 2;

const getProgressClassName = ({ parameters_fulfilled = 0, parameters_required = 1 }) => {
	const ratio = parameters_fulfilled / parameters_required;

	if (ratio < THRESHOLD) return { className: 'low', color: RATIO_COLOR_MAPPING.low };

	if (ratio === 1) return { className: 'complete', color: RATIO_COLOR_MAPPING.complete };

	return { className: 'medium', color: RATIO_COLOR_MAPPING.medium };
};

function List(props) {
	const { questId } = props;

	const { loading, data } = useGetQuestWinner({ questId });

	if (loading) return <WinnerLoader />;

	return (
		<div className={styles.winner_container}>
			{(data || []).slice(0, 6).map((item) => {
				const {
					rank = '',
					total_score = '',
					parameters_fulfilled = 0,
					parameters_required
					= 1,
				} = item;

				const progress = (parameters_fulfilled * 100) / (parameters_required || 1);

				const {
					className: progressClassname,
					color,
				} = getProgressClassName({ parameters_fulfilled, parameters_required });

				return (
					<div key={item?.agent_id} className={styles.winner_item}>
						{rank === 1
							? (
								<div className={styles.rank_container}>
									<img
										src={GLOBAL_CONSTANTS.image_url.public_leaderboard_quest_winner_icon}
										alt="Badge"
										className={styles.badge_icon}
									/>
								</div>
							) : null}
						<div className={styles.user_details}>
							<div className={styles.rank}>{rank}</div>
							<div className={styles.user_data}>
								<div className={styles.user_name}>Ananya Majumdar</div>
								<div className={styles.score}>
									<span className={styles.score_heading}>Score</span>
									{' '}
									{total_score}
								</div>
							</div>
						</div>
						<div className={styles.progress_container}>
							<div className={styles.parameters_div}>
								<div className={styles.parameters}>Parameteres</div>
								<div className={styles.parameters_ratio} style={{ color }}>
									{parameters_fulfilled}
									{' '}
									/
									{' '}
									{parameters_required}
								</div>
							</div>
							<ProgressBar progress={progress} className={styles?.[progressClassname]} />
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default List;
