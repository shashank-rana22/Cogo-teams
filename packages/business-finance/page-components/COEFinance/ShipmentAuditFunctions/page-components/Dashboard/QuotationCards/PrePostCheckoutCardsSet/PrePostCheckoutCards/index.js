import { Placeholder } from '@cogoport/components';
import React from 'react';

import Headings from './Headings';
import Milestones from './Milestones';

const PLACEHOLDER_ARRAY_LENGTH = 4;

function PrePostCheckoutCards({
	data = {},
	loading = false,
	type = '',
	accordionState = false,
	toggleAccordion = '',
	setAccordionState = () => {},
	category = '',
	shipment_id = '',
	getPrePostShipmentQuotes = () => {},
}) {
	return (
		<div style={{ width: '100%' }}>
			<div>
				<div style={{ marginBottom: '20px' }}>
					<Headings headingText={type} />
				</div>
				{loading
					? Array(PLACEHOLDER_ARRAY_LENGTH).fill('').map((item) => (
						<div key={item} style={{ marginBottom: '10px' }}>
							<Placeholder height="40px" width="600px" />
						</div>
					))
					: (
						<Milestones
							data={data}
							loading={loading}
							accordionState={accordionState}
							toggleAccordion={toggleAccordion}
							setAccordionState={setAccordionState}
							category={category}
							shipment_id={shipment_id}
							getPrePostShipmentQuotes={getPrePostShipmentQuotes}
						/>
					)}
			</div>
		</div>
	);
}

export default PrePostCheckoutCards;
