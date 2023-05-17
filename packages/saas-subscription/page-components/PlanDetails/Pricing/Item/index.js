import getValues from '../../../../utils/getValues';

import itemFunction from './itemFunction';
import styles from './styles.module.css';

const Item = ({ configs, item }) => {
	const itmFn = itemFunction();
	return (
		configs.map((config) => (
			<div
				className={styles.col}
				style={{ width: config?.width }}
			>
				{getValues({ itemData: item, config, itemFunction: itmFn })}

			</div>
		))
	);
};

export default Item;
