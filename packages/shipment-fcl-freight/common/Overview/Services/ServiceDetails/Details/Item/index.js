import { Tooltip, cl } from '@cogoport/components';

import { renderValue } from '../../../../../CargoDetails/RenderCargoPills/renderValue';

import styles from './styles.module.css';

function Item({ state, label, detail }) {
	const valueFormatted = renderValue(label?.key, detail);
	return (
		<div className={styles.container}>
			<div className={styles.key}>
				{label?.label}
				:
			</div>
			<Tooltip content={valueFormatted} placement="bottom">
				<div className={cl`${styles.value} ${state}`}>{valueFormatted}</div>
			</Tooltip>
		</div>
	);
}

export default Item;
