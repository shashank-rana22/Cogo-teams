import SummaryCard from '../SummaryCard';

function InvoiceCard({ salesFunnel, currency, revenueMonth, loading }) {
	const sale = salesFunnel?.summary?.invoices?.count;
	const customers = salesFunnel?.summary?.invoices?.customers_count;
	const repeated_customers = salesFunnel?.summary?.invoices?.repeat_customers || 0;
	const containers = salesFunnel?.summary?.invoices?.containers_count || 0;
	const CBM = salesFunnel?.summary?.invoices?.air_weight || 0;
	const KG = salesFunnel?.summary?.invoices?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.invoices?.amount || 0;
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
