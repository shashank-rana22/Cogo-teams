import ScoringGraph from './ScoringGraph';
import styles from './styles.module.css';

function RankingAndScoring(props) {
	const { scoringGraphData } = props;

	return (
		<div className={styles.container}>
			<div className={styles.ranking_container}>
				<h3 className={styles.heading}>Ranking</h3>

				<div className={styles.empty_text}>
					No ranking exists for Cogo India.
					Click on a User/Team from the leaderboard to view Scoring Analytics
				</div>
			</div>

			<ScoringGraph scoringGraphData={scoringGraphData} />
		</div>
	);
}

export default RankingAndScoring;
