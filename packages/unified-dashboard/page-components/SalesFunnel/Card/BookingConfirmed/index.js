import SummaryCard from '../SummaryCard';

function BookingConfirmed({ salesFunnel, currency, loading }) {
	const sale = salesFunnel?.summary?.booking_confirmed?.count || 0;
	const customers = salesFunnel?.summary?.booking_confirmed?.customers_count;
	const repeated_customers = salesFunnel?.summary?.booking_confirmed?.repeat_customers;
	const containers = salesFunnel?.summary?.booking_confirmed?.containers_count || 0;
	const CBM = salesFunnel?.summary?.booking_confirmed?.air_weight || 0;
	const KG = salesFunnel?.summary?.booking_confirmed?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.booking_confirmed?.amount || 0;
	return (
		<div>
			<SummaryCard
				title="Bookings Confirmed"
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

export default BookingConfirmed;
