import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';

import styles from './styles.module.css';

const geo = getGeoConstants();

function RemarkContent({ fundAllotmentTimeline = [], currency = '' }) {
	return (
		<div>
			{fundAllotmentTimeline ? (
				<div className={styles.container}>
					<div className={styles.history_tl_container}>
						<ul className={styles.tl}>
							{(fundAllotmentTimeline || []).map(
								({
									allocatedAmount = '',
									updatedAt = '',
									allocatedBy = '',
								}) => (
									<li key={updatedAt}>
										<div className={styles.sub_container}>
											<div className={styles.amount_text}>
												<div
													className={styles.amount}
												>
													{formatAmount({
														amount  : allocatedAmount,
														currency,
														options : {
															currencyDisplay       : 'symbol',
															style                 : 'currency',
															minimumFractionDigits : 0,
														},
													})}
												</div>
											</div>
											<div className={styles.date_name_container}>
												<div className={styles.date_name_text}>
													{formatDate({
														date       : updatedAt,
														dateFormat : geo.formats.date.default,
														timeFormat : geo.formats.time['12hrs'],
														formatType : 'dateTime',
													})}
												</div>
												<div className={styles.date_name_text}>
													Updated by :
													{' '}
													{allocatedBy}
												</div>
											</div>
										</div>
									</li>
								),
							)}
						</ul>
					</div>
				</div>
			) : (
				'No Data'
			)}
		</div>
	);
}

export default RemarkContent;
