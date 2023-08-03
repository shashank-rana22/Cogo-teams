import SummaryCard from '../SummaryCard';

function BookingsDone({ salesFunnel, currency, loading }) {
	const sale = salesFunnel?.summary?.booking_done?.count;
	const customers = salesFunnel?.summary?.booking_done?.customers_count;
	const repeated_customers = salesFunnel?.summary?.booking_done?.repeat_customers;
	const containers = salesFunnel?.summary?.booking_done?.containers_count || 0;
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
