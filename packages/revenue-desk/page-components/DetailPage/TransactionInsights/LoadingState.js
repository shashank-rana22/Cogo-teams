import { Placeholder } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import iconMapping from '../../../helpers/iconMapping';
import incoTermMapping from '../../../helpers/incoTermMapping';
import serviceLabelMapping from '../../../helpers/serviceLabelMapping';
import { VALUE_ONE, VALUE_ZERO } from '../../constants';
import PortDetails from '../../List/Card/Body/PortDetails';

import styles from './styles.module.css';

const arr = [VALUE_ZERO, VALUE_ONE];

function LoadingState({ itemData }) {
	return (
		<div className={styles.maincontainer}>
			<div className={styles.single_column}>
				<div className={styles.emptybox}>
					{' '}
				</div>
				<div className={styles.single_box}>
					{iconMapping[itemData?.shipment_type]}
					<span style={{ marginLeft: '7px' }}>
						{serviceLabelMapping[itemData?.shipment_type]}
					</span>
				</div>
				<div className={styles.single_box}>
					{serviceLabelMapping[itemData?.shipment_type]}
					{' '}
					{startCase(itemData?.trade_type)
						|| startCase(incoTermMapping[itemData?.inco_term])}
				</div>
				<div className={styles.port_pair_container}>
					<PortDetails data={itemData} />
				</div>
				<div className={styles.single_box}>
					Total Transaction
				</div>
			</div>
			{(arr || []).map((singleItem) => (
				<div className={styles.single_column} key={singleItem}>
					<div className={styles.heading}>
						<Placeholder height="25px" width="350px" margin="0 10px" />
					</div>
					<div className={styles.single_box}>
						<Placeholder height="24px" width="250px" />
					</div>
					<div className={styles.single_box}>
						<Placeholder height="24px" width="250px" />
					</div>
					<div className={styles.port_pair_container_placeholder}>
						<Placeholder height="24px" width="250px" />
					</div>
					<div className={styles.single_box}>
						<Placeholder height="24px" width="250px" />
					</div>
				</div>
			))}
		</div>
	);
}
export default LoadingState;
