import RenderPills from '@cogoport/air-modules/components/RenderPills';

import SERVICE_WISE_LABELS from '../../../../../constants/service-wise-label';

import styles from './styles.module.css';

function ListRightPart({ item = {} }) {
	const { shipment_type = '' } = item;

	return (
		<div className={styles.list_right_part}>
			<RenderPills
				detail={item}
				labels={SERVICE_WISE_LABELS[shipment_type]}
			/>
		</div>
	);
}
export default ListRightPart;
