import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const LOADING_ARRAY_SIZE = 3;
const SUB_ARRAY_SIZE = 6;

function LoadingState() {
	return (
		<div className={styles.container}>

			<Placeholder height={24} width={200} className={styles.main_item} />

			{[...Array(LOADING_ARRAY_SIZE).keys()].map((item) => (
				<div key={item}>
					<Placeholder height={16} width={150} className={styles.sub_item} />

					<div className={styles.item_container}>
						{[...Array(SUB_ARRAY_SIZE).keys()].map((subItem) => (
							<div className={styles.inner_container} key={subItem}>
								<Placeholder height={10} className={styles.item} />
								<Placeholder height={10} />
							</div>
						))}
					</div>
				</div>

			))}
		</div>
	);
}

export default LoadingState;
