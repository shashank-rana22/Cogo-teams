import { Placeholder } from '@cogoport/components';
import React from 'react';

import { VALUE_ONE, VALUE_TWO, VALUE_THREE, VALUE_FOUR, VALUE_FIVE } from '../../constants';

function LoaderDetails() {
	return (
		<div>
			{
				[VALUE_ONE, VALUE_TWO, VALUE_THREE, VALUE_FOUR, VALUE_FIVE]?.map((key) => (
					<Placeholder
						height="50px"
						key={key}
						style={{ margin: '10px' }}
					/>
				))
			}
		</div>
	);
}
export default LoaderDetails;
