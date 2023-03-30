import formatAmount from '@cogoport/globalization/utils/formatAmount';

import currencyCoversion from '../../../utils/currencyCoversion';
import getMonthYear from '../../../utils/getMonthYear';
import CustomerCountCard from '../../CustomerCountCard';
import styles from '../styles.module.css';

const DesktopCard = ({
	master = [],
	keys = [],
	selectedFilterTab,
	currency,
}) => {
	const borderColor = (item) => (
		selectedFilterTab === 'month'
			&& item?.month === getMonthYear().getMonth
			&& item?.year === getMonthYear().getYear
	);

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
	return cardRevenueData.map((val) => (
		<div className={styles.all_card}>
			<div className={borderColor(val) ? `${styles.card_wrapper_border}` : `${styles.card_wrapper}`}>
				<div className={styles.revenue_wrapper}>
					<div className={styles.revenue_col}>
						<div className={styles.text_tag}>
							{val === undefined
								? 0
								: formatAmount(
									'en-US',
									currencyCoversion(currency, val?.total_amount || 0),
									currency,
									{ currencyDisplay: 'symbol' },
								)}
						</div>
					</div>
					<div className={styles.booking}>
						<CustomerCountCard
							isBooking
							title="No. of Bookings"
							count={val === undefined ? 0 : Math.trunc(val?.no_of_booking)}
						/>
						<CustomerCountCard
							isBooking={false}
							title="No. of Customers"
							count={val === undefined ? 0 : Math.trunc(val?.no_of_customers)}
						/>
					</div>
				</div>
			</div>
		</div>
	));
};

export default DesktopCard;
