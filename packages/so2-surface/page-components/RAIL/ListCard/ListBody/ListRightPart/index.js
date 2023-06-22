import RenderPills from '../../../../../common/RenderPills';
import SERVICE_WISE_LABELS from '../../../../../helpers/service-wise-label';

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
