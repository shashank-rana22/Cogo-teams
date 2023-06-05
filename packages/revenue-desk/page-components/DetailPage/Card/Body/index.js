import CargoDetails from '../../../List/Card/Body/CargoDetails';
import PortDetails from '../../../List/Card/Body/PortDetails';

import styles from './styles.module.css';

function Body({ data }) {
	return (
		<div className={styles.body_container}>
			<div className={styles.left_section}>
				<div className={styles.text1}>
					{data.importer_exporter?.business_name}
				</div>
				<div className={styles.portpair_container}>
					<PortDetails data={data} />
				</div>
			</div>
			<div className={styles.middle_section}>
				<CargoDetails data={data} />
			</div>
			<div className={styles.right_section}>
				<div className={styles.sell_price}>
					Sell Price :
					<span style={{ fontWeight: '700', color: ' #221F20' }}>USD 700</span>
				</div>
				<div className={styles.kam_discount_text}>
					KAM Discount Applied :
					<span style={{ fontWeight: '600', color: ' #4F4F4F' }}>INR 1000</span>
				</div>
			</div>
		</div>
	);
}

export default Body;
