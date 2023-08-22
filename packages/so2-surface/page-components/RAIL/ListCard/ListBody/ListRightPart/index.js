import RenderPills from '../../../../../common/RenderPills';
import SERVICE_WISE_LABELS from '../../../../../helpers/service-wise-label';

import styles from './styles.module.css';

function ListRightPart({ item = {}, shipmentType = 'rail_domestic_freight' }) {
	return (
		<div className={styles.list_right_part}>
			<div>
				<RenderPills
					detail={item}
					labels={SERVICE_WISE_LABELS[shipmentType]}
				/>
			</div>
		</div>
	);
}
export default ListRightPart;
