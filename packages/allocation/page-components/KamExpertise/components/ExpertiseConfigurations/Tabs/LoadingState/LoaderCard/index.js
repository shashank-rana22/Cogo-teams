import { Placeholder } from '@cogoport/components';
import React from 'react';

function LoaderCard({ columnsToLoad }) {
	return (
		<>
			<div>
				<div style={{ marginBottom: '8px' }}>
					<Placeholder width="100px" height="20px" />
				</div>
			</div>

			<div style={{ display: 'flex' }}>

				{[...Array(columnsToLoad)].map(() => (
					<div style={{ flexBasis: '24%' }}>
						<div style={{ marginBottom: '8px' }}>
							<Placeholder width="200px" height="18px" />
						</div>

						<Placeholder width="50px" height="20px" />

					</div>
				))}
			</div>
		</>
	);
}

export default LoaderCard;
