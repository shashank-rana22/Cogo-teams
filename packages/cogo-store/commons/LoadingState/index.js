import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_COUNT = 6;

function LoadingState() {
	return (
		<div className={styles.loader}>
			{[...Array(DEFAULT_COUNT).keys()].map((val) => (
				<div key={val} className={styles.loader_cont}>
					<Placeholder height="200px" width="100%" margin="0px 0px 20px 0px" />
					<div className={styles.circle}>
						<Placeholder type="circle" radius="20px" margin="0px 0px 20px 0px" />
						<Placeholder type="circle" radius="20px" margin="0px 0px 20px 4px" />
					</div>
					<Placeholder key={val} height="20px" width="100%" margin="0px 0px 20px 0px" />
					<Placeholder key={val} height="20px" width="20%" margin="0px 0px 20px 0px" />
				</div>
			))}
		</div>
	);
}

export default LoadingState;
