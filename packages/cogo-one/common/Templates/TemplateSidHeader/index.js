import { Tooltip } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import { LABELS, SHIPMENT_STATE } from '../../../constants/flashRatesMapping';
import { RENDER_VALUE_MAPPING, serviceDetails } from '../../../utils/detailsHelperFuncs';

import styles from './styles.module.css';

const SHIPMENT_ARR_MIN_LENGTH = 2;

const ShipmentDetails = ({ shipmentArr }) => (shipmentArr || []).map((itm) => (
	<div className={styles.chips} key={itm}>
		{itm}
	</div>
));

function TemplateSidHeader({
	shipmentData = {},
	setShipmentData = () => {},
	orgId = '',
}) {
	const { shipment_type = '', serial_id } = shipmentData || {};
	const details = serviceDetails({ detail: shipmentData || {}, service: shipment_type });

	const shipmentArr = LABELS.reduce(
		(acc, item) => {
			const val = RENDER_VALUE_MAPPING[item]?.(details) || details[item] || '';

			if (val?.trim()) {
				return [...acc, val];
			}

			return acc;
		},
		[],
	);

	return (
		<div className={styles.select_section}>
			{serial_id ? (
				<div className={styles.pill_container}>
					<div className={styles.shipment_details}>
						<ShipmentDetails shipmentArr={shipmentArr.slice(
							GLOBAL_CONSTANTS.zeroth_index,
							SHIPMENT_ARR_MIN_LENGTH,
						)}
						/>
					</div>

					{shipmentArr.length > SHIPMENT_ARR_MIN_LENGTH && (
						<Tooltip
							content={(
								<ShipmentDetails shipmentArr={shipmentArr.slice(
									SHIPMENT_ARR_MIN_LENGTH,
								)}
								/>
							)}
							interactive
							placement="left"
						>
							<div className={styles.show_more}>
								+
								<span>{(shipmentArr || []).length - SHIPMENT_ARR_MIN_LENGTH}</span>
								More
							</div>
						</Tooltip>
					)}
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
				className={shipment_type ? styles.small_select_container : styles.select}
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
