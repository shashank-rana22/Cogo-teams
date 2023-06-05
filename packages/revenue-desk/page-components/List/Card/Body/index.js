import { Pill } from '@cogoport/components';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Body({ data }) {
	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<div className={styles.heading}>
					<div>
						<Pill size="md" color="#E0E0E0">3 Reverts</Pill>
					</div>
					<div className={styles.text}>
						{data.importer_exporter?.business_name}
					</div>
				</div>
				<div className={styles.port_pair_container}>
					<PortDetails data={data} />
				</div>

			</div>
			<div className={styles.right_section}>
				<CargoDetails data={data} />
			</div>
		</div>
	);
}

export default Body;
