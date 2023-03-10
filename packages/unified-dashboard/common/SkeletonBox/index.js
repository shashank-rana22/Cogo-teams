import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function SkeletonBox() {
	return (
		<div className={styles.container}>
			<Placeholder height="30px" width="100%" margin="10px 0px" />
			{[...Array(5).keys()].map(() => (
				<div className={styles.body}>
					<Placeholder height="10px" width="50%" margin="5px 8px" />
					<Placeholder height="10px" width="50%" margin="5px 8px" />
				</div>
			))}
		</div>
	);
}

export default SkeletonBox;
