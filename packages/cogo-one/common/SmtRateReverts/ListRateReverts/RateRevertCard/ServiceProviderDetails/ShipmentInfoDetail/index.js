import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import useGetShipment from '../../../../../../hooks/useGetShipment';
import { RENDER_VALUE_MAPPING } from '../../../../../../utils/detailsHelperFuncs';

import styles from './styles.module.css';

const DATA_TO_SHOW = {
	trade_type                      : 'Trade Type',
	container_size                  : 'Container Size',
	containers_count                : 'Containers Count',
	packages_count                  : 'Packages Count',
	trucks_count                    : 'Trucks Count',
	truck_type                      : 'Truck Type',
	trip_type                       : 'Trip Type',
	container_type                  : 'Container Type',
	commodity                       : 'Commodity',
	payment_term                    : 'Payment Term',
	inco_term                       : 'Inco Term',
	packages                        : 'Packages',
	volume                          : 'Volume',
	weight                          : 'Weight',
	commodity_description           : 'Commodity Description',
	cargo_weight_per_container      : 'Cargo Weight Per Container',
	hs_code                         : 'Hs Code',
	bl_type                         : 'BL Type',
	cargo_readiness_date            : 'Cargo Ready Date',
	schedule_departure              : 'Schedule Departure',
	estimated_departure             : 'Expected Departure',
	transit_time                    : 'Transit Time',
	free_days_detention_destination : 'Destination Detention Free Days',
};

function ShipmentInfoDetail({ shipmentId = '', shipmentPopover = {}, id = '' }) {
	const {
		loading = false,
		data = {},
	} = useGetShipment({ shipmentId, shipmentPopover, id });

	const { primary_service_detail = {}, summary = {} } = data || {};

	const { serial_id = '' } = summary || {};

	if (loading) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.spinner_loader}
					width={50}
					height={50}
					alt="loader"
				/>
			</div>
		);
	}

	if (isEmpty(primary_service_detail)) {
		return <div className={styles.loader}>No Data...</div>;
	}

	return (
		<div className={styles.container}>
			{serial_id ? (
				<div className={styles.each_content}>
					Serial ID:
					<span>{serial_id}</span>
				</div>
			) : null}

			{Object.entries(DATA_TO_SHOW)?.map(
				([key, label]) => {
					const displayValue = RENDER_VALUE_MAPPING?.[key]?.(primary_service_detail);

					if (!displayValue) {
						return null;
					}

					return (
						<div
							key={key}
							className={styles.each_content}
						>
							{label}
							:
							<span>{displayValue}</span>
						</div>
					);
				},
			)}
		</div>
	);
}

export default ShipmentInfoDetail;
