import { Placeholder } from '@cogoport/components';
import React, { useMemo } from 'react';

const STYLES_COL = { padding: '0px 4px' };

function LoadingState({ fields = [], isLast = false }) {
	const keys = useMemo(() => Array(fields?.length).fill(null).map(() => Math.random()), [fields?.length]);

	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0' }}>
			{fields.map((singleItem, index) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<div key={keys[index]} style={STYLES_COL}>
						<Placeholder width="100%" height="20px" />
					</div>
				);
			})}
		</div>
	);
}

export default LoadingState;
