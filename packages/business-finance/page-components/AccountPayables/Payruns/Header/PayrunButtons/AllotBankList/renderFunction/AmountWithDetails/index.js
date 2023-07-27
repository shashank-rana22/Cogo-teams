import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function AmountWithDetails({ itemData = {}, selectedPayrun = {}, checkedRow = {} }) {
	const { fundAllotmentTimeline, balance, currency, allocatedAmount } = itemData;
	const { totalValue } = selectedPayrun || checkedRow;

	return (
		<div className={styles.container}>
			<div className={styles.amount_container}>
				<div className={balance < totalValue ? styles.text : ''}>
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
			</div>
			{!isEmpty(fundAllotmentTimeline) && (
				<div className={styles.details_text}>
					Updated By :
					{' '}
					{fundAllotmentTimeline[GLOBAL_CONSTANTS.zeroth_index].allocatedBy}
					{' '}
					<div>
						{formatDate({
							date       : fundAllotmentTimeline[GLOBAL_CONSTANTS.zeroth_index].updatedAt,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'dateTime',
							separator  : ' ',
						})}
					</div>
				</div>
			)}
		</div>
	);
}
export default AmountWithDetails;
