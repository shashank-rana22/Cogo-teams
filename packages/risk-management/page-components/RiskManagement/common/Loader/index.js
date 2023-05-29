import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader() {
	return (
		<div>

			<div className={styles.flex_row}>
				{[1, 2, 3, 4, 5].map((item) => (
					<div className={styles.percent} key={item.id}>
						<Placeholder className={styles.loader} />
					</div>
				))}

			</div>

		</div>
	);
}

export default Loader;
