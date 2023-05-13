import { cl } from '@cogoport/components';

import { CARGO_LABELS } from '../../../constants';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

function RenderCargoPills({ detail = {} }) {
	return (
		<div className={cl`${styles.container} ${styles.shipment_cargo_details_root}`}>
			{CARGO_LABELS.map((label) => {
				const value = renderValue(label, detail);
				if (detail?.[label] && value) {
					return (
						<div className={cl` ${styles.box} `} key={label}>
							{value}
						</div>
					);
				}

				return null;
			})}
		</div>
	);
}
export default RenderCargoPills;
