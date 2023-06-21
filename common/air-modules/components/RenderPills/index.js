import { renderValue } from './renderValue';
import styles from './styles.module.css';

function RenderPills({ detail, labels }) {
	return (
		<>
			{(labels || []).map((label) => {
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
		</>
	);
}
export default RenderPills;
