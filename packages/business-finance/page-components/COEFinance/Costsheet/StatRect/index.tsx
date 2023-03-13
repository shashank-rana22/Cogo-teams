import { Placeholder } from '@cogoport/components';
import React, { CSSProperties } from 'react';

import Line from '../Line';

import styles from './styles.module.css';

interface Props {
	heading?: string;
	expected?: string | number;
	actual?: string | number;
	loading?: boolean;
}

function StatRect({ heading, expected, actual, loading }: Props) {
	return (
		<div className={styles.layout}>
			{!loading ? (
				<>
					<div className={styles.heading}>{heading}</div>
					<Line color="#F68B21" margin="10px 0px 0px 0px" />
					<div className={styles.spacebetween}>
						<div
							className={styles.column}
							style={{ '--margin': '0px 5px 0px 0px' } as CSSProperties}
						>
							<span className={styles.number}>
								{((expected as number) || 0).toFixed(2) || '0'}
								{' '}
								%
								{' '}
							</span>
							<span className={styles.label}>Expected</span>
						</div>
						<div
							className={styles.column}
							style={{ '--margin': '0px 0px 0px 5px' } as CSSProperties}
						>
							<span className={styles.number}>
								{((actual as number) || 0).toFixed(2) || '0'}
								{' '}
								%
							</span>
							<span className={styles.label}>Actual</span>
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
