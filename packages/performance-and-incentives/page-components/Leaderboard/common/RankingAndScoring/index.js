import Ranking from './Ranking';
import ScoringGraph from './ScoringGraph';
import styles from './styles.module.css';

function RankingAndScoring(props) {
	const { rankData, scoringGraphData } = props;

	return (
		<div className={styles.container}>

			<Ranking rankData={rankData} />

			<ScoringGraph scoringGraphData={scoringGraphData} />
		</div>
	);
}

export default RankingAndScoring;
