import React from 'react';
import { isEmpty} from '@cogoport/utils';
import getFormattedSupplierData from '../../../../../utils/revenueDeskUtils/getFormattedSupplierData';
import styles from './styles.module.css'

const Item = ({ bookingItem = {}, idx, isLast = false }) => {
	

	return (
		<div className={styles.container}>
			<div className={styles.serial}>{idx + 1}</div>

			<div className={styles.flexCol}>
				{data?.map((item, index) => {
					
					const {is_rate_expired, is_reverted_rate, columns} = getFormattedSupplierData(bookingItem, index);

					return (
						<div className={styles.flexRow}>
							<div className={styles.wrapper}>
								Supplier Booking(
								{is_reverted_rate ? 'Flash Revert' : source || ''})
							</div>

							{columns.map((col) =>
								!isEmpty(col.value) ? (
									<div className={styles.containerRowKeyValue}>
										<div className = {styles.heading}>{col.label}</div>

										<div className={styles.text}>
											{col.value}
											{col.label === 'Supplier Name' && is_rate_expired ? (
												<span style={{ color: 'red' }}>
													(This Rate is Expired)
												</span>
											) : null}
										</div>
									</div>
								) : null,
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Item;