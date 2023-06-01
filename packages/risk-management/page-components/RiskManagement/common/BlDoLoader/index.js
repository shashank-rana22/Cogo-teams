import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function BlDoLoader() {
	return (
		<div className={styles.container1}>
			<div>
				<Placeholder className={styles.container} />
			</div>
			<div>
				<Placeholder className={styles.container4} />
			</div>
			<div className={styles.main_div}>
				<div>
					<Placeholder className={styles.container3} />
				</div>
				<div>
					<Placeholder className={styles.container2} />
				</div>
			</div>
			<Placeholder className={styles.container4} />
			<div>
				<Placeholder className={styles.container2} />
			</div>
		</div>
	);
}

export default BlDoLoader;
