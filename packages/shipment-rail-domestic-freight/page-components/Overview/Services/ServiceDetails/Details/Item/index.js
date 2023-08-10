import { cl } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import { renderValue } from '../../../../../../commons/CargoDetails/RenderCargoPills/renderValue';

import styles from './styles.module.css';

function Item({ label, detail }) {
	const valueFormatted = renderValue(label?.key, detail);

	return valueFormatted
		? (
			<div className={styles.container}>
				<div className={styles.key}>
					{label?.label}
				</div>
				<div className={cl`${styles.value}`}>{startCase(valueFormatted)}</div>
			</div>
		) : null;
}

export default Item;
