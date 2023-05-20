import { useState } from 'react';

import getValues from '../../../../utils/getValues';

import itemFunction from './itemFunction';
import styles from './styles.module.css';

const Item = ({ configs, item }) => {
	const [isEditPrice, setIsEditPrice] = useState(false);
	const itmFn = itemFunction({ isEditPrice, setIsEditPrice });
	return (
		configs.map((config) => (
			<div
				key={`${item?.id}_${config.key}`}
				className={styles.col}
				style={{ width: config?.width }}
			>
				{getValues({ itemData: item, config, itemFunction: itmFn })}
			</div>
		))
	);
};

export default Item;
