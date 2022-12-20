import React from 'react';
import {ICNonFunded} from './ic-empty-non-funded.svg';
import styles from './styles.module.css'

const EmptyState = ({
	isMobile = false,
	showContent = {
		heading: 'No Results Found!',
		description: 'Looks like you do not have any records for this section',
	},
}) => {
	return (
		<div className={styles.container}>
			<div>
				<div className={styles.heading}>{showContent.heading}</div>

				<div className={styles.content}>{showContent.description}</div>
			</div>

			{!isMobile ? (
				<div
					className={styles.emptyStateIcon}
				>
					<ICNonFunded width={120} height={120} />
				</div>
           	) : null}
		</div>
	);
};

export default EmptyState;