import Block from './Block';
import styles from './styles.module.css';

function Activity(props) {
	const { activityData } = props;

	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Activity</h3>

			<div className={styles.blocks_container}>
				{Object.entries(activityData).map(([activity, block]) => (
					<Block
						key={activity}
						activity={activity}
						block={block}
					/>
				))}
			</div>
		</div>
	);
}

export default Activity;
