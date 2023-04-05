import { Placeholder } from '@cogoport/components';
import React from 'react';

function Loader({ count = 2, width }) {
	return (
		<>
			{[...Array(count)].map(() => (
				<Placeholder style={{ height: '20px', width: width || '100%' }}>
					<rect width="100%" height="20" />
				</Placeholder>
			))}
		</>
	);
}

export default Loader;
