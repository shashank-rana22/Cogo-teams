import { Placeholder } from '@cogoport/components';
import React from 'react';

import GenerateColumn from './GenerateColumn';
import Headings from './Headings';

const PLACEHOLDER_ARRAY_LENGTH = 4;

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
				{loading
					? Array(PLACEHOLDER_ARRAY_LENGTH).fill('').map((item) => (
						<div key={item} style={{ marginBottom: '10px' }}>
							<Placeholder height="40px" width="600px" />
						</div>
					))
					: (
						<GenerateColumn
							data={data}
							loading={loading}
							accordionState={accordionState}
							toggleAccordion={toggleAccordion}
							setAccordionState={setAccordionState}
							category={category}
						/>
					)}
			</div>
		</div>
	);
}

export default PrePostCheckoutCards;
