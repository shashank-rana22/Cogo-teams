import { AsyncSelect } from '@cogoport/forms';

import CargoDetails from '../../ShipmentsCard/CargoDetails';

import styles from './styles.module.css';

const SHIPMENT_STATE = ['completed', 'in_progress', 'confirmed_by_importer_exporter', 'shipment_received'];

function TemplateSidHeader({
	shipmentData = {},
	setShipmentData = () => {},
	orgId = '',
}) {
	const { shipment_type = '' } = shipmentData || {};

	return (
		<div className={styles.select_section}>
			<div className={styles.pill_container}>
				<CargoDetails
					detail={shipmentData}
					service={shipment_type}
				/>
			</div>
			<AsyncSelect
				asyncKey="list_shipments"
				valueKey="serial_id"
				labelKey="serial_id"
				placeholder="Select SID"
				value={shipmentData?.serial_id}
				size="sm"
				style={{ width: 130 }}
				onChange={(_, obj) => {
					setShipmentData(obj);
				}}
				isClearable
				params={{
					filters: {
						importer_exporter_id : orgId,
						state                : SHIPMENT_STATE,
					},
				}}
			/>
		</div>
	);
}

export default TemplateSidHeader;
