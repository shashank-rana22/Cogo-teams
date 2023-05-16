import { renderValue } from './renderValue';
import styles from './styles.module.css';

const labels = ['truck_type',	'trucks_count'];

function CargoPills({ item = {} }) {
	const { ftl_freight_services = [] } = item || {};
	const detail = ftl_freight_services?.[0];

	return (
		<>
			{labels.map((label) => {
				if (detail?.[label] && renderValue(label, detail)) {
					return (
						<div className={styles.box} key={label}>
							{renderValue(label, detail)}
						</div>
					);
				}

				return null;
			})}
		</>
	);
}
export default CargoPills;
