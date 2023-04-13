import React from 'react';

import getSingleCardOptions from '../DisplayCard/getSingleCardOptions';

import styles from './styles.module.css';

function ListHeader() {
	const options = getSingleCardOptions({ });

	return (
		<div className={styles.header_container}>

			{(options || []).map((item) => {
				const { label = '' } = item;

				return (
					<div
						key={label}
						className={styles.header_item}
						style={{ width: `${['Actions', 'Status'].includes(label) ? '10%' : '20%'}` }}
					>
						{label}
					</div>
				);
			})}

		</div>
	);
}

export default ListHeader;
