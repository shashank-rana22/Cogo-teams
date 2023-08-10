import { cl, Tooltip } from '@cogoport/components';
import { AsyncSelect } from '@cogoport/forms';

import { LABELS, SHIPMENT_STATE } from '../../../constants/flashRatesMapping';
import { RENDER_VALUE_MAPPING, serviceDetails } from '../../../utils/detailsHelperFuncs';

import styles from './styles.module.css';

const MIN_SLICE_INDEX = 0;
const SHIPMENT_ARR_MIN_LENGTH = 2;

const ShipmentDetails = ({ shipmentArr }) => (shipmentArr || []).map((itm) => (
	<div className={cl`${!itm ? '' : styles.chips}`} key={itm}>
		{itm}
	</div>
));

function TemplateSidHeader({
	shipmentData = {},
	setShipmentData = () => {},
	orgId = '',
}) {
	const { shipment_type = '', serial_id } = shipmentData || {};
	const details = serviceDetails({ detail: shipmentData, service: shipment_type });

	const shipmentArr = LABELS.map((item) => RENDER_VALUE_MAPPING[item]?.(details) || details[item] || '');

	return (
		<div className={styles.select_section}>
			{serial_id ? (
				<div className={styles.pill_container}>
					<div className={styles.shipment_details}>
						{(shipmentArr || []).slice(MIN_SLICE_INDEX, SHIPMENT_ARR_MIN_LENGTH).map((itm) => {
							if (!itm) {
								return null;
							}

							return (
								<div className={styles.chips} key={itm}>
									{itm}
								</div>
							);
						})}
					</div>

					<Tooltip
						content={<ShipmentDetails shipmentArr={shipmentArr} />}
						interactive
						placement="left"
					>
						<div className={styles.show_more}>
							+
							{(shipmentArr || []).length - SHIPMENT_ARR_MIN_LENGTH}
							More
						</div>
					</Tooltip>
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
