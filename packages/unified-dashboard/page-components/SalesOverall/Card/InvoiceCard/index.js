import SummaryCard from '../SummaryCard';

function InvoiceCard({ salesFunnel, currency, revenueMonth, loading }) {
	const sale = salesFunnel?.summary?.revenue?.invoices;
	const customers = salesFunnel?.summary?.revenue?.customers_count;
	const repeated_customers = salesFunnel?.summary?.revenue?.repeated_customers;
	const containers = salesFunnel?.summary?.revenue?.no_of_containers || 0;
	const CBM = salesFunnel?.summary?.revenue?.air_weight || 0;
	const KG = salesFunnel?.summary?.revenue?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.revenue?.revenue_amount || 0;
	return (
		<div>
			<SummaryCard
				title="Invoiced Revenue"
				amount={amount}
				sale={sale}
				customers={customers}
				repeated_customers={repeated_customers}
				containers={containers}
				CBM={CBM}
				KG={KG}
				currency={currency}
				loading={loading}
				revenueMonth={revenueMonth}
				text="Invoices"
			/>
		</div>
	);
}

export default InvoiceCard;
