import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function Cards({ data = {}, statsLoading = false }) {
	const { weekly_completed_percentage = {} } = data;
	return (
		<div className={styles.container}>
			{Object.keys(weekly_completed_percentage).map((key) => (
				<div className={styles.box} key={key}>
					<div className={`${styles.progress_bar}`}>
						<div>
							{statsLoading ? <Placeholder style={{ height: '12px', width: '20px' }} /> : (
								<>
									{weekly_completed_percentage[key] || DEFAULT_VALUE}
									%
								</>
							)}
						</div>
						<div style={{ fontSize: '8px' }}>Completed</div>
					</div>
					<div className={styles.date}>
						{statsLoading ? <Placeholder style={{ height: '16px', width: '80px' }} /> : (
							<>
								{' '}
								{ key }
							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
}
export default Cards;
