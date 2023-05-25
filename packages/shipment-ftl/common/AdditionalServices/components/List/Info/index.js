import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import STATUS_ITEMS from '../../../constants/STATUS_ITEMS';

import Item from './Item';
import styles from './styles.module.css';

function Info() {
	const items = Object.values(STATUS_ITEMS || {}).map((item) => (
		<Item {...item} />
	));

	return (
		<div className={styles.container}>
			<Tooltip
				placement="bottom"
				content={<div className={styles.content_div}>{items}</div>}
				interactive
				className={styles.custom_tooltip}
			>
				<div className={styles.info_div}>
					<IcMInfo />
				</div>
			</Tooltip>
		</div>
	);
}

export default Info;
