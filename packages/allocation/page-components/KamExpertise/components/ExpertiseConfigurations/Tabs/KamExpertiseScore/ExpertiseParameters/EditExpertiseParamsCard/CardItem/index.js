import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';
import React from 'react';

import styles from './styles.module.css';

function CardItem(item) {
	const { name, controls } = item;

	return (
		<div className={styles.card_item}>
			<div className={styles.name_container}>
				<div className={styles.parameter_name}>{startCase(name)}</div>
				<div className={styles.icon_container}>
					<Tooltip content="Lorem ipsum dolor sit amet, consectetur adipiscing elit" placement="top">
						<div><IcMInfo width={14} height={14} /></div>
					</Tooltip>

				</div>
			</div>

			{/* <div className={styles.controls_container} /> */}

		</div>
	);
}

export default CardItem;
