import { Placeholder, cl } from '@cogoport/components';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styles from './styles.module.css';

function LoadingState({ fields = [], isLast = false }) {
	const STYLES_COL = { padding: '0px 4px' };

	return (
		<div className={cl`${isLast ? '' : styles.container}`}>
			{fields.map((singleItem) => {
				if (singleItem?.show === false) {
					return null;
				}
				return (
					<div
						// eslint-disable-next-line custom-eslint/key-as-function
						key={uuid()}
						style={STYLES_COL}
					>
						<Placeholder width="100%" height="20px" />
					</div>
				);
			})}
		</div>
	);
}

export default LoadingState;
