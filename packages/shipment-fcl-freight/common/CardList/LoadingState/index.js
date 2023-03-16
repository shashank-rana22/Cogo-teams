import { Placeholder, Grid } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

// const { Col } = Grid;

function LoadingState({ fields = [], isLast = false }) {
	const stylesCol = { padding: '0px 4px' };

	return (
		<Row style={{ borderBottom: isLast ? 'none' : '1px solid #e0e0e0' }}>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}

				return (
					<Col
						xs={6}
						sm={6}
						md={singleItem.span}
						lg={singleItem.span}
						style={stylesCol}
					>
						<Placeholder width="100%" height="20px" />
					</Col>
				);
			})}
		</Row>
	);
}

export default LoadingState;
