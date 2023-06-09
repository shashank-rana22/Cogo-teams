import CargoDetails from '../../../List/Card/Body/CargoDetails';
import PortDetails from '../../../List/Card/Body/PortDetails';

import styles from './styles.module.css';

function Body({ data, price }) {
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
			<div className={styles.text1}>
				Sell Price
				<div className={styles.text2}>
					{price}
				</div>
			</div>
		</div>
	);
}

export default Body;
