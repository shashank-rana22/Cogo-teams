import SummaryCard from '../SummaryCard';

function QuotationCard({ salesFunnel, currency, loading }) {
	const sale = salesFunnel?.summary?.quote_sent?.quotations_count;
	const customers = salesFunnel?.summary?.quote_sent?.customers_count;
	const repeated_customers = salesFunnel?.summary?.quote_sent?.repeated_customers;
	const containers = salesFunnel?.summary?.quote_sent?.no_of_containers || 0;
	const CBM = salesFunnel?.summary?.quote_sent?.air_weight || 0;
	const KG = salesFunnel?.summary?.quote_sent?.lcl_weight || 0;
	const amount = salesFunnel?.summary?.quote_sent?.amount || 0;
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
