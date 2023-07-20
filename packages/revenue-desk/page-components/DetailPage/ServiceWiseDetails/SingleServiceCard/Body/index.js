import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { VALUE_ONE, VALUE_ZERO } from '../../../../constants';
import CargoDetails from '../../../../List/Card/Body/CargoDetails';
import PortDetails from '../../../../List/Card/Body/PortDetails';
import EditSellQuotation from '../../../ShipmentCard/EditSellQuotation';

import styles from './styles.module.css';

function Body({ data, price, shipmentData }) {
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
				{data?.service_type === 'fcl_freight_service'
				&& ['in_progress', 'confirmed_by_importer_exporter'].includes(shipmentData?.state)
				&& !data?.is_preference_set && <EditSellQuotation data={shipmentData} />}
				Sell Price
				<div className={styles.text2}>
					{formatAmount({
						amount   : price?.[VALUE_ONE],
						currency : price?.[VALUE_ZERO],
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>
		</div>
	);
}

export default Body;
