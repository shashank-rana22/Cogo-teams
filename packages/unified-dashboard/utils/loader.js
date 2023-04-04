import { Placeholder } from '@cogoport/components';
import React, { useId } from 'react';

function Loader({ count = 2, width }) {
	const id = useId();
	return (
		<>
			{[...Array(count)].map((_, index) => (
				// using useId for unique key generation
				// eslint-disable-next-line react/no-array-index-key
				<Placeholder key={`${id}${index}`} style={{ height: '20px', width: width || '100%' }}>
					<rect width="100%" height="20" />
				</Placeholder>
			))}
		</>
	);
}

export default Loader;
