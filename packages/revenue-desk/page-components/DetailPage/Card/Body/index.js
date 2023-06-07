import CargoDetails from '../../../List/Card/Body/CargoDetails';
import PortDetails from '../../../List/Card/Body/PortDetails';

import styles from './styles.module.css';

function Body({ data }) {
	return (
		<div className={styles.body_container}>
			<div className={styles.left_section}>
				<div className={styles.portpair_container}>
					<PortDetails data={data} />
				</div>
			</div>
			<div className={styles.middle_section}>
				<CargoDetails data={data} />
			</div>
		</div>
	);
}

export default Body;
