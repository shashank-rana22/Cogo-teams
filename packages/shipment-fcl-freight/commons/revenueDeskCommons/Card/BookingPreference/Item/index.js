import { cl } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import getFormattedSupplierData from '../../../../../utils/revenueDeskUtils/getFormattedSupplierData';

import styles from './styles.module.css';

function Item({ bookingItem = {}, idx, isLast = false }) {
	const { data = [], source = '' } = bookingItem;

	return (
		<div className={cl`${styles.container}
		${isLast ? cl.ns('isLast') : ' '}`}
		>
			<div className={styles.serial}>{idx + 1}</div>

			<div className={styles.flex_col}>
				{data.map((item, index) => {
					const { is_rate_expired, is_reverted_rate, columns } = getFormattedSupplierData(
						bookingItem,
						index,
						source,
					);

					return (
						<div className={styles.flex_row}>
							<div className={cl`${styles.flex_wrapper}${is_reverted_rate ? cl.ns('reverted') : ' '}`}>
								Supplier Booking(
								{is_reverted_rate ? 'Flash Revert' : source || ''}
								)
							</div>

							{columns.map((col) => (!isEmpty(col.value) ? (
								<div className={styles.container_row_key_value}>
									<div className={styles.heading}>{col.label}</div>

									<div className={cl`${styles.text}${is_reverted_rate ? cl.ns('reverted') : ' '}`}>
										{col.value}
										{col.label === 'Supplier Name' && is_rate_expired ? (
											<span style={{ color: 'red' }}>
												(This Rate is Expired)
											</span>
										) : null}
									</div>
								</div>
							) : null))}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Item;
