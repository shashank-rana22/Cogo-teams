import { Placeholder, cl } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADER_COUNT = 4;

function Loader() {
	return (
		<div className={styles.container}>

			<div className={styles.details}>
				<Placeholder style={{ marginRight: '50px' }} />

				<Placeholder className="circle" width="45px" height="45px" />

				<div className={styles.ports}>
					<Placeholder height="14px" style={{ margin: '0 0 10px 0' }} />
					<Placeholder height="14px" />
				</div>

				<div className={cl` ${styles.ports} ${styles.destination}`}>
					<Placeholder height="14px" style={{ margin: '0 0 10px 0' }} />
					<Placeholder height="14px" />
				</div>

				{Array.from(Array(LOADER_COUNT).keys()).map((key) => (
					<Placeholder key={key} style={{ marginRight: '16px' }} />
				))}
			</div>

		</div>
	);
}

export default Loader;
