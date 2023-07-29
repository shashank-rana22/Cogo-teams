import { renderValue } from '@cogoport/air-modules/components/RenderPills/renderValue';
import { Tooltip } from '@cogoport/components';

import styles from './styles.module.css';

function Item({ label, detail }) {
	const valueFormatted = renderValue(label?.key, detail);

	return valueFormatted
		? (
			<div className={styles.container}>
				<div className={styles.key}>
					{label?.label}
				</div>
				<Tooltip content={valueFormatted} placement="bottom">
					<div className={styles.value}>{valueFormatted}</div>
				</Tooltip>
			</div>
		) : null;
}

export default Item;
