import Block from './Block';
import styles from './styles.module.css';
import useGetActivityCount from './useGetActivityCount';

function RightPanel(props) {
	const { view } = props;

	const { data } = useGetActivityCount({ view });

	const { block_wise_stats: activityData } = data || {};

	console.log('activityData :: ', activityData);

	return (
		<div className={styles.container}>
			<p className={styles.heading}>ACTIVITY COUNT</p>

			<div className={styles.blocks}>
				{Object.entries(activityData || {}).map(([activity, block_data]) => (
					<Block
						key={activity}
						activity={activity}
						data={block_data}
					/>
				))}
			</div>
		</div>
	);
}

export default RightPanel;
