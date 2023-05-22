import { Placeholder } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

function LoadingState({ fields = [], isLast = false }) {
	const stylesCol = { padding: '0px 4px' };

	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid var(--color-secondary-greyscale-5)' }}>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				return (
					<div
						key={uuid()}
						style={stylesCol}
					>
						<Placeholder width="100%" height="20px" />
					</div>
				);
			})}
		</div>
	);
}

export default LoadingState;
