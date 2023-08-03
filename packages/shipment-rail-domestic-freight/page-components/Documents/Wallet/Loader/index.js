import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function Loader({ forModal }) {
	let width = '291px';
	let height = '90px';

	if (forModal) {
		width = '109px';
		height = '73px';
	}

	return (
		<div className={styles.container}>
			<div className={styles.comments_wrap}>
				<Placeholder width={width} height={height} />

				<Placeholder width={width} height={height} />

				{forModal ? (
					<Placeholder width={width} height={height} />
				) : null}
			</div>
		</div>
	);
}

export default Loader;
