import ScoringGraph from './ScoringGraph';
import styles from './styles.module.css';

function RankingAndScoring(props) {
	const { scoringGraphData } = props;

	return (
		<div className={styles.container}>
			{/* <Ranking rankData={rankData} /> */}
			<ScoringGraph scoringGraphData={scoringGraphData} />
		</div>
	);
}

export default RankingAndScoring;
