import React from 'react';

import styles from '../styles.module.css';

function BookingParamsMapping({ bookingParams = [] }) {
	return (
		<div className={styles.wrap}>
			Packages
			{(bookingParams)?.map((x) => (
				<div className={styles.wrap} key={x.id}>
					<div className={styles.packages}>
						{x.packages_count}
						{' '}
						pkg
						{' '}
						,
					</div>
					{x.handling_type && (
						<div className={styles.packages}>
							{x.handling_type}
							{' '}
							,
						</div>
					)}
					{x.packing_type
				&& (
					<div className={styles.packages}>
						{x.packing_type}
						{' '}
					</div>
				)}
					{x.height && 			(
						<div className={styles.packages}>
							,
							{' '}
							{x.height}
							{' '}
							X
						</div>
					)}
					{x.width && 	(
						<div className={styles.packages}>
							{x.width}
							{' '}
							X
						</div>
					)}
					{x.length && 	(
						<div className={styles.packages}>
							{x.length}
							{' '}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

export default BookingParamsMapping;
