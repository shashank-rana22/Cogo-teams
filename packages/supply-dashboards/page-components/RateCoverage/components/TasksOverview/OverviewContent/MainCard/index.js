import { Placeholder, ProgressBar } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function MainCard({ data = {}, statsLoading = false }) {
	const { completed = 0, total = 0, completed_percentage = 0 } = data;
	return (
		<div className={styles.container}>
			<ProgressBar progress={(statsLoading) ? DEFAULT_VALUE : completed_percentage} />
			<div className={styles.sub_container}>
				<div className={styles.column}>
					<div>Completed</div>
					<div className={styles.bold_font}>
						{statsLoading
							? <Placeholder />
							: (
								<>
									{completed}
									{' '}
									Rates
								</>
							)}

					</div>
				</div>
				<div className={styles.column}>
					<div>Total</div>
					<div className={styles.bold_font}>
						{statsLoading ? <Placeholder /> : (
							<>
								{total}
								{' '}
								Rates
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MainCard;
