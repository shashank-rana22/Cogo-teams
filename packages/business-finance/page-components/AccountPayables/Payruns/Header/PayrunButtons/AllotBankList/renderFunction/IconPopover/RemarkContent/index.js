import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function RemarkContent({ fundAllotmentTimeline = [], currency = '' }) {
	return (
		<div>
			{!isEmpty(fundAllotmentTimeline) ? (
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
												{formatAmount({
													amount  : allocatedAmount,
													currency,
													options : {
														style                 : 'currency',
														currencyDisplay       : 'code',
														maximumFractionDigits : 2,
													},
												})}
											</div>
											<div>
												<div className={styles.date_name_text}>
													{formatDate({
														date       : updatedAt,
														dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
														timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
														formatType : 'dateTime',
														separator  : ' | ',
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
				<div>
					No Remarks
				</div>
			)}
		</div>
	);
}

export default RemarkContent;
