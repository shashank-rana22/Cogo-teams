import SummaryCard from '../SummaryCard';

function BookingConfirmed({ salesFunnel, currency, loading }) {
	const sale = salesFunnel?.summary?.bookings_confirmed?.booking_confirmed_count;
	const customers = salesFunnel?.summary?.bookings_confirmed?.customers_count;
	const repeated_customers = salesFunnel?.summary?.bookings_confirmed?.repeated_customers;
	const containers = salesFunnel?.summary?.bookings_confirmed?.no_of_containers || 0;
	const CBM = salesFunnel?.summary?.bookings_confirmed?.air_weight || 0;
	const KG = salesFunnel?.summary?.bookings_confirmed?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.bookings_confirmed?.amount || 0;
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
