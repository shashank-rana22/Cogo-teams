import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div className={styles.container}>
			<div className={styles.popular_topics}>Popular Topics</div>

			<div className={styles.display_topics}>
				{[...Array(6)].map(() => (
					<div className={styles.square_div} style={{ cursor: 'not-allowed' }}>
						<div className={styles.icon_grid}>
							<div className={styles.icon_loader}>
								<Placeholder width="50px" height="50px" />
							</div>

							<div className={styles.display_name_and_topic}>
								<Placeholder
									width="150px"
									height="15px"
									style={{ margin: '2px 0px 10px 8px' }}
								/>

								<div className={styles.skeleton_container}>
									<Placeholder
										width="100px"
										height="15px"
										style={{ margin: '2px 0px 10px 8px' }}
									/>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default Loader;
