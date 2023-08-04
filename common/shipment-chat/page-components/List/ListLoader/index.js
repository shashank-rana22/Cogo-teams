import { Placeholder } from '@cogoport/components';
import { IcAShipAmber } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

const NUMBER_OF_LOADING_CARDS = 6;

function Loader() {
	return (
		<div>
			{Array(NUMBER_OF_LOADING_CARDS).fill().map((i) => (
				<div className={styles.card} key={i}>
					<div className={styles.ship_image_container}>
						<IcAShipAmber height={30} width={30} />
					</div>

					<div className={styles.card_item}>
						<Placeholder height="16px" width="120px" style={{ marginBottom: '4px' }} />

						<Placeholder height="12px" width="100px" />
					</div>
				</div>
			))}
		</div>
	);
}
export default Loader;
