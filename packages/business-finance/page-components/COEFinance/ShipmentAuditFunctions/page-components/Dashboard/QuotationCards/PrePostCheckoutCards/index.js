import React from 'react';

import GenerateColumn from './GenerateColumn';
import Headings from './Headings';

function PrePostCheckoutCards({
	data = {},
	loading = false,
	type = '',
	accordionState,
	toggleAccordion,
	setAccordionState,
	category,
}) {
	return (
		<div style={{ width: '100%' }}>
			<div>
				{/* {console.log({ data })} */}
				<div>
					<Headings heaadingText={type} />
				</div>
				<GenerateColumn
					data={data}
					loading={loading}
					accordionState={accordionState}
					toggleAccordion={toggleAccordion}
					setAccordionState={setAccordionState}
					category={category}
				/>
			</div>
		</div>
	);
}

export default PrePostCheckoutCards;
