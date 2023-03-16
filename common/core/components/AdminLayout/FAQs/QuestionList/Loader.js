import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function Loader({ topic = {} }) {
	return (
		<div className={styles.container}>
			<div className={styles.topic_heading}>
				Topic:
				{' '}
				{startCase(topic.display_name) || 'Search Result'}
			</div>

			<div className={styles.list}>
				{[...Array(6)].map(() => (
					<div>
						<div
							className={styles.question}
							style={{ cursor: 'not-allowed' }}
						>
							<div className={styles.skeleton_container}>
								<Placeholder
									width="90%"
									height="20px"
									style={{ borderRadius: 4 }}
								/>
							</div>

							<div className={styles.skeleton_wrapper}>
								{[...Array(3)].map(() => (
									<Placeholder
										width="60px"
										height="16px"
										margin="4px 12px 0 0"
										style={{ borderRadius: 6 }}
									/>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Loader;
