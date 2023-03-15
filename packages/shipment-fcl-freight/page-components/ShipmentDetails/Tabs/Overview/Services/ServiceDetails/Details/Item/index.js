import { ToolTip, cl } from '@cogoport/components';

import { renderValue } from '../../../../../../../../common/cargo-details/renderValue';

import styles from './styles.module.css';

function Item({ state, label, detail }) {
	const valueFormatted = renderValue(label?.key, detail);

	return (
		<div className={styles.container}>
			<div className={styles.key}>
				{label?.label}
				:
			</div>
			<ToolTip theme="light" content={valueFormatted}>
				<div className={cl`${styles.value} ${state}`}>{valueFormatted}</div>
			</ToolTip>
		</div>
	);
}

export default Item;
