import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function EmptyState({ heading = 'results', placement = 'center' }) {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				{placement === 'center' ? (
					<div className={styles.ic_container}>
						<IcMSearchlight width={80} height={80} fill="#ee3425" />
					</div>
				) : null}
				<div className={styles.heading}>
					Sorry! no
					{' '}
					{heading}
					{' '}
					found :(
				</div>
				<div className={styles.content}>
					We are sorry what you were looking for. Please try another way
				</div>
			</div>
		</div>
	);
}

export default EmptyState;
