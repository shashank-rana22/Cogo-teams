import { Pill } from '@cogoport/components';

import { VALUE_ZERO } from '../../../constants';

import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import styles from './styles.module.css';

function Body({ data }) {
	let total_revert_count = 0;

	(data?.[`${data?.shipment_type}_services`] || [])?.forEach((element) => {
		total_revert_count += Number(element?.revert_count);
	});

	return (
		<div className={styles.container}>
			<div className={styles.left_section}>
				<div className={styles.heading}>
					{
						total_revert_count > VALUE_ZERO ? (
							<div className={styles.text1}>
								<Pill size="md" color="#E0E0E0">{`${total_revert_count} Reverts`}</Pill>
							</div>
						) : null
					}
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
