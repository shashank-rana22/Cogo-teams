import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARRAY_SIZE = 6;
const SUB_ARRAY_SIZE = 3;

function LoadingState() {
	return (
		<div>
			{[...Array(LOADING_ARRAY_SIZE).keys()].map((item) => (
				<div className={styles.item_container} key={item}>

					{[...Array(SUB_ARRAY_SIZE).keys()].map((subItem) => (
						<div className={styles.inner_container} key={subItem}>
							<Placeholder height={12} className={styles.item} />
						</div>
					))}

				</div>
			))}
		</div>
	);
}

export default LoadingState;
