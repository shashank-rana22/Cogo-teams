import { Placeholder } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function LoadingState({ fields = [], isLast = false }) {
	const stylesCol = { padding: '0px 4px' };

	return (
		<div style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0' }}>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<div
						// xs={6}
						// sm={6}
						// md={singleItem.span}
						// lg={singleItem.span}
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
