import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React from 'react';

import styles from './styles.module.css';

const FIXED_DECIMAL_VALUE = 2;

function StatRect({ heading = '', expected, actual, loading }) {
	return (
		<div className={styles.layout}>
			{!loading ? (
				<>
					<div className={styles.heading}>{heading}</div>
					<div className={styles.line} />
					<div className={styles.spacebetween}>
						<div
							className={styles.column}
						>
							<span className={styles.number}>
								{((expected) || GLOBAL_CONSTANTS.zeroth_index).toFixed(FIXED_DECIMAL_VALUE) || '0'}
								{' '}
								%
								{' '}
							</span>
							<span className={styles.label}>Expected</span>
						</div>
						<div
							className={styles.column}
						>
							<span className={styles.number}>
								{((actual) || GLOBAL_CONSTANTS.zeroth_index).toFixed(FIXED_DECIMAL_VALUE) || '0'}
								{' '}
								%
							</span>
							<span className={styles.label}>Operational</span>
						</div>
					</div>
				</>
			) : (
				<Placeholder height="100px" width="100%" />
			)}
		</div>
	);
}

export default StatRect;
