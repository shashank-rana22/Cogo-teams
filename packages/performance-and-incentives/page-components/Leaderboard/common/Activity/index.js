import { Button } from '@cogoport/components';
import { IcMArrowRight } from '@cogoport/icons-react';

import ACTIVITY_CONSTANTS from '../../../../constants/activity-constants';

import Block from './Block';
import styles from './styles.module.css';

function Activity() {
	return (
		<div className={styles.container}>

			<div className={styles.inner_container}>
				<h3 className={styles.heading}>Activity</h3>

				<Button size="md" themeType="link">
					Detailed View
					{' '}
					<IcMArrowRight width={16} height={16} />
				</Button>
			</div>

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
