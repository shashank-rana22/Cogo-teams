import formatAmount from '@cogoport/globalization/utils/formatAmount';

import currencyCoversion from '../../../utils/currencyCoversion';
import CustomerCountCard from '../../CustomerCountCard';
import styles from '../styles.module.css';

function MobileCard({
	master = [],
	keys = [],
	selectedFilterTab,
	currency,
}) {
	const cardRevenueData = master.map((el) => {
		const keyToUse = selectedFilterTab === 'week' ? 'day' : 'month';
		const cardData = keys?.find((val) => val[keyToUse] === el[keyToUse]);
		if (cardData === undefined) {
			return {
				month           : el?.month,
				no_of_booking   : 0,
				no_of_customers : 0,
				total_amount    : 0,
				year            : `${el?.year}`,
			};
		}
		return cardData;
	});

	const etdMonthData = (cardRevenueData && cardRevenueData.length > 0)
		? cardRevenueData[cardRevenueData.length - 1]
		: null;

	return (
		<div className={styles.all_card_mobile}>
			<div className={styles.card_wrapper_mobile}>
				<div className={styles.revenue_wrapper_mobile}>
					<div className={styles.revenue_col_mobile}>
						<div className={styles.text_tag}>
							{etdMonthData === undefined
								? 0
								: formatAmount({
									amount: currencyCoversion(
										currency,
										etdMonthData?.total_amount || 0,
									),
									currency,
									options: {
										style                 : 'currency',
										currencyDisplay       : 'symbol',
										notation              : 'compact',
										compactDisplay        : 'short',
										minimumFractionDigits : 2,
									},
								})}

						</div>
					</div>
					<div className={styles.booking_mobile}>
						<CustomerCountCard
							isBooking
							title="No. of Bookings"
							count={
								etdMonthData === undefined
									? 0
									: Math.trunc(etdMonthData?.no_of_booking)
							}
						/>
						<CustomerCountCard
							isBooking={false}
							title="No. of Customers"
							count={
								etdMonthData === undefined
									? 0
									: Math.trunc(etdMonthData?.no_of_customers)
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MobileCard;
