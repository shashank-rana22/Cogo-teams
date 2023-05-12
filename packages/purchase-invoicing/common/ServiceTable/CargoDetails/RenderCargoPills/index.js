import { cl } from '@cogoport/components';

import { CARGO_LABELS } from '../../../../constants';

import { renderValue } from './renderValue';
import styles from './styles.module.css';

function RenderCargoPills({ detail = {} }) {
	return (
		<>
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
		</>
	);
}
export default RenderCargoPills;
