import Content from './Content';

function InvoiceContent({
	lineItems = [],
	checkedLineItem = [],
	handleLineItemSelect = () => {},
}) {
	return (
		<div>
			{lineItems?.map((lineItem) => (
				<div key={lineItem.id}>
					<Content
						lineItem={lineItem}
						checkedLineItem={checkedLineItem}
						handleLineItemSelect={handleLineItemSelect}
					/>
				</div>
			))}
		</div>
	);
}

export default InvoiceContent;
