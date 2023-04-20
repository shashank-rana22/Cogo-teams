import { Tooltip, cl } from '@cogoport/components';

import { renderValue } from '../../../../../CargoDetails/RenderCargoPills/renderValue';

import styles from './styles.module.css';

function Item({ label, detail }) {
	console.log({ label, detail });
	const valueFormatted = renderValue(label?.key, detail);
	return valueFormatted
		? (
			<div className={styles.container}>
				<div className={styles.key}>
					{label?.label}
				</div>
				<Tooltip content={valueFormatted} placement="bottom">
					<div className={cl`${styles.value}`}>{valueFormatted}</div>
				</Tooltip>
			</div>
		) : null;
}

export default Item;
