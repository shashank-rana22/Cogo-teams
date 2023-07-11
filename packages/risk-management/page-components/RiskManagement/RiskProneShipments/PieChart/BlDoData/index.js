import React from 'react';

import getFormatedData from '../getFormatedData';

import styles from './styles.module.css';

function BlDoData({ stats = {} }) {
	const {
		LATE_COLLECTION_MAPPING,
	} = getFormatedData(stats);
	const { late_collection_stats, late_release_stats } = stats;
	const { late_collection_total = '' } = late_collection_stats || {};

	const {
		late_release_total = '', payment_not_received = '',
		payment_done_but_bl_not_released = '',
	} = late_release_stats || {};
	return (
		<div className={styles.bl_do_container}>
			<div className={styles.late_collection}>
				<div className={styles.bl_square1} />
				<div className={styles.sub_container}>

					<div className={styles.label}>
						Late collection :
					</div>
					<div className={styles.value}>
						{late_collection_total || '-'}
					</div>
				</div>
				{LATE_COLLECTION_MAPPING.map((item) => (
					<div className={styles.sub_container} key={item.value}>
						<div className={styles.point} />
						<div>
							{item.label}
							{' '}
							{ item.value || '-'}
						</div>
					</div>
				))}
			</div>
			<div className={styles.bl_do_container}>
				<div>
					<div className={styles.bl_square5} />
					<div className={styles.sub_container}>
						<div className={styles.label}>
							Late Release :
						</div>
						<div className={styles.value}>
							{late_release_total || '-'}
						</div>
					</div>

					<div className={styles.sub_container}>
						<div className={styles.point} />
						<div>
							Customer - Payment Not Received :
							{'  '}
							{ payment_not_received || '-'}
						</div>
					</div>
					<div className={styles.sub_container}>
						<div className={styles.point} />
						<div>
							Payment Done But BL Not Released :
							{'  '}
							{ payment_done_but_bl_not_released || '-'}
						</div>
					</div>

				</div>
			</div>
		</div>
	);
}
export default BlDoData;
