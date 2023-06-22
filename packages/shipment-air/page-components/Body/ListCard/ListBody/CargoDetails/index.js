import RenderPills from '@cogoport/air-modules/components/RenderPills';

import SERVICE_WISE_LABELS from '../../../../../constants/service-wise-label';

import styles from './styles.module.css';

function CargoDetails({ item = {} }) {
	const { shipment_type = '' } = item;

	return (
		<div className={styles.cargo_details_container}>
			<RenderPills
				detail={item}
				labels={SERVICE_WISE_LABELS[shipment_type]}
			/>
		</div>
	);
}
export default CargoDetails;
