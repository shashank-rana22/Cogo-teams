import PortPair from '../../../common/PortPair';
import LoadingState from '../../LoadingState';

import ShippingDetails from './ShippingDetails';
import styles from './styles.module.css';
import UpdatedOn from './UpdatedOn';

function ShipmentDetailsCard({ data, loading }) {
	return (
		<>
			{!loading ? (
				<div className={styles.container}>
					<ShippingDetails data={data} />
					<div className={styles.details}>
						<PortPair data={data} />
						<UpdatedOn data={data} />
					</div>
				</div>
			) : (
				<LoadingState />
			)}
		</>
	);
}

export default ShipmentDetailsCard;
