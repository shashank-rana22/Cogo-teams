import { Placeholder } from '@cogoport/components';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Loader({ count = 2, width }) {
	return (
		<>
			{[...Array(count)].map(() => (
				<Placeholder key={uuidv4()} style={{ height: '20px', width: width || '100%' }}>
					<rect width="100%" height="20" />
				</Placeholder>
			))}
		</>
	);
}

export default Loader;
