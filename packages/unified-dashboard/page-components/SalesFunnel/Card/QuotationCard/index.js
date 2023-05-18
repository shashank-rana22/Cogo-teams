import SummaryCard from '../SummaryCard';

function QuotationCard({ salesFunnel, currency, loading }) {
	const sale = salesFunnel?.summary?.quotations?.count;
	const customers = salesFunnel?.summary?.quotations?.customers_count;
	const repeated_customers = salesFunnel?.summary?.quotations?.repeat_customers;
	const containers = salesFunnel?.summary?.quotations?.containers_count || 0;
	const CBM = salesFunnel?.summary?.quotations?.air_weight || 0;
	const KG = salesFunnel?.summary?.quotations?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.quotations?.amount || 0;
	return (
		<div>
			<SummaryCard
				title="Quotations Sent"
				amount={amount}
				sale={sale}
				customers={customers}
				repeated_customers={repeated_customers}
				containers={containers}
				CBM={CBM}
				KG={KG}
				currency={currency}
				loading={loading}
				text="Quotes"
			/>
		</div>
	);
}

export default QuotationCard;
