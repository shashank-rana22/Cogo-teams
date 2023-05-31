import { CARGO_LABELS } from '../../../constants';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

function RenderCargoPills({ detail = {} }) {
	return (
		<div className={styles.container}>
			{CARGO_LABELS.map((label) => {
				const value = renderValue(label, detail);

				if (detail?.[label] && value) {
					return (
						<div className={styles.box} key={label}>
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
