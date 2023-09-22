import ACTIVITY_CONSTANTS from '../../../../constants/activity-constants';

import Block from './Block';
import styles from './styles.module.css';

function Activity() {
	return (
		<div className={styles.container}>
			<h3 className={styles.heading}>Activity</h3>

			<div className={styles.blocks_container}>
				{Object.values(ACTIVITY_CONSTANTS).map((block) => (
					<Block
						key={block}
						block={block}
					/>
				))}
			</div>
		</div>
	);
}

export default Activity;
