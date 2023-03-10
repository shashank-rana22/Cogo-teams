import SummaryCard from '../SummaryCard';

function BookingsDone({ salesFunnel, currency, loading }) {
	const sale = salesFunnel?.summary?.booking_done?.booking_done_count;
	const customers = salesFunnel?.summary?.booking_done?.customers_count;
	const repeated_customers = salesFunnel?.summary?.booking_done?.repeated_customers;
	const containers = salesFunnel?.summary?.booking_done?.no_of_containers || 0;
	const CBM = salesFunnel?.summary?.booking_done?.air_weight || 0;
	const KG = salesFunnel?.summary?.booking_done?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.booking_done?.amount || 0;

	return (
		<div>
			<SummaryCard
				title="Bookings Done"
				amount={amount}
				sale={sale}
				customers={customers}
				repeated_customers={repeated_customers}
				containers={containers}
				CBM={CBM}
				KG={KG}
				currency={currency}
				loading={loading}
				text="Bookings"
			/>
		</div>
	);
}

export default BookingsDone;

// import formatAmount from '@cogoport/globalization/utils/formatAmount';

// import SkeletonBox from '../../../common/SkeletonBox';

// import styles from './styles.module.css';

// function BookingsDone({ salesFunnel, currency, loading }) {
// 	if (loading) {
// 		return <SkeletonBox />;
// 	}

// 	return (
// 		<div className={styles.summary_card}>
// 			<div className={styles.container}>
// 				<div className={styles.col}>
// 					<div className={styles.booking_col}>
// 						<div className={styles.booking_total}>
// 							{formatAmount({
// 								amount  : salesFunnel?.summary?.booking_done?.amount || 0,
// 								currency,
// 								options : {
// 									style                 : 'currency',
// 									currencyDisplay       : 'symbol',
// 									notation              : 'compact',
// 									compactDisplay        : 'short',
// 									minimumFractionDigits : 2,
// 								},
// 							})}
// 						</div>

// 						<div className={styles.booking_value}>
// 							<div className={styles.stat}>
// 								<div className={styles.booking_details}>
// 									<span>
// 										#Bookings
// 										{' '}
// 										{salesFunnel?.summary?.booking_done?.booking_done_count}
// 									</span>
// 									<span>
// 										#Customers
// 										{' '}
// 										{salesFunnel?.summary?.booking_done?.customers_count}
// 									</span>

// 									<span>
// 										<div className={styles.repeat_container}>
// 											<span>#Repeat Customers </span>
// 											<span>
// 												{salesFunnel?.summary?.booking_done?.repeated_customers}
// 											</span>
// 										</div>
// 									</span>
// 									<span>
// 										#Containers
// 										{' '}
// 										{(
// 											salesFunnel?.summary?.booking_done?.no_of_containers || 0
// 										).toLocaleString()}
// 									</span>
// 									<span>
// 										#CBM
// 										{' '}
// 										{(
// 											salesFunnel?.summary?.booking_done?.air_weight || 0
// 										).toLocaleString()}
// 									</span>
// 									<span>
// 										#KGs
// 										{' '}
// 										{(
// 											salesFunnel?.summary?.booking_done?.lcl_weight || 0
// 										).toLocaleString()}
// 									</span>
// 								</div>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

// export default BookingsDone;
