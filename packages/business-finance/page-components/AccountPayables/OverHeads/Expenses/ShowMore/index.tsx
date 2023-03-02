import { IcMArrowDown, IcMArrowUp } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function ShowMore() {
	const [moreData, setMoreData] = useState(false);
	return (
		<div className={styles.container}>
			{!moreData && (
				<div className={styles.button_container}>
					<button
						className={styles.button_style}
						onClick={() => setMoreData(true)}
					>
						<div>Show more</div>
						{' '}
						<div style={{ marginBottom: '-4px' }}><IcMArrowDown /></div>
					</button>
				</div>
			)}

			<div className={moreData
				? styles.more_data_container : `${styles.more_data_container} ${styles.more_data_container_close}`}
			>
				<div className={styles.data_div}>
					<div className={styles.section}>
						<div>TDS</div>
						<div className={styles.element}>INR XXX</div>
					</div>
					<div className={styles.section}>
						<div>Payable</div>
						<div className={styles.element}>INR XXX</div>
					</div>
					<div className={styles.section}>
						<div>Paid</div>
						<div className={styles.element}>INR XXX</div>
					</div>
					<div className={styles.section}>
						<div>Due Date</div>
						<div className={styles.element}>XXXXX</div>
					</div>
					<div className={styles.section}>
						<div>Invoice Date</div>
						<div className={styles.element}>XXXXX</div>
					</div>
					<div className={styles.section}>
						<div>Upload Date</div>
						<div className={styles.element}>XXXXX</div>
					</div>
				</div>
				<div className={styles.button_container}>
					<button
						className={styles.button_style}
						onClick={() => setMoreData(false)}
					>
						<div>Show less</div>
						{' '}
						<div style={{ marginBottom: '-4px' }}><IcMArrowUp /></div>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ShowMore;
