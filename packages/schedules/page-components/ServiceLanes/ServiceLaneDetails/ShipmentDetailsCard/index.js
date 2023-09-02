import { Placeholder } from '@cogoport/components';

import PortPair from '../../../common/PortPair';

import ShippingDetails from './ShippingDetails';
import styles from './styles.module.css';
import UpdatedOn from './UpdatedOn';

function ShipmentDetailsCard({ data, loading }) {
	return (
		<div>
			<div className={styles.container}>
				{loading ? <Placeholder width="1000px" height="30px" /> : <ShippingDetails data={data} />}
				<div className={styles.details}>
					{loading ? <Placeholder width="600px" /> : <PortPair data={data} />}
					{loading ? <Placeholder width="200px" /> : <UpdatedOn data={data} />}
				</div>
			</div>
		</div>
	);
}

export default ShipmentDetailsCard;
