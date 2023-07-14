import { Placeholder } from '@cogoport/components';
import React from 'react';

const STYLES_COL = { padding: '0px 4px' };

function LoadingState({ fields = [], isLast = false }) {
	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0' }}>
			{fields.map((singleItem) => {
				if (singleItem.show === false) {
					return null;
				}

				return (
					<div key={singleItem.name} style={STYLES_COL}>
						<Placeholder width="100%" height="20px" />
					</div>
				);
			})}
		</div>
	);
}

export default LoadingState;
