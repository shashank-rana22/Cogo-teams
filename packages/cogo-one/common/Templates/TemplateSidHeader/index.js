import { cl } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';

import { LABELS, SHIPMENT_STATE } from '../../../constants/flashRatesMapping';
import { RENDER_VALUE_MAPPING, serviceDetails } from '../../../utils/detailsHelperFuncs';

import styles from './styles.module.css';

function TemplateSidHeader({
	shipmentData = {},
	setShipmentData = () => {},
	orgId = '',
}) {
	const { shipment_type = '', serial_id } = shipmentData || {};

	const details = serviceDetails({ detail: shipmentData, service: shipment_type });

	return (
		<div className={styles.select_section}>
			{serial_id ? (
				<div className={styles.pill_container}>
					<div className={styles.shipment_details}>
						{(LABELS || []).map((label) => {
							const value = RENDER_VALUE_MAPPING[label]?.(details) || details[label] || '';

							if (!value || !shipmentData?.[label]) {
								return null;
							}

							return (
								<div className={styles.chips} key={label}>
									{value}
								</div>
							);
						})}
					</div>
				</div>
			) : null}
			<AsyncSelect
				asyncKey="list_shipments"
				valueKey="serial_id"
				labelKey="serial_id"
				placeholder="Select SID"
				value={serial_id}
				size="sm"
				isClearable
				className={cl`${shipment_type ? styles.small_select_container : styles.select}`}
				onChange={(_, obj) => {
					setShipmentData(obj);
				}}
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
