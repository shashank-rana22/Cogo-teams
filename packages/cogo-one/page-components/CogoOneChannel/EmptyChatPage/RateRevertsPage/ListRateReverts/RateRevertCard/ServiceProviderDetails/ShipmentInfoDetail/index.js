import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { Image } from '@cogoport/next';
import { startCase, differenceInDays, isEmpty } from '@cogoport/utils';

import useGetShipment from '../../../../../../../../hooks/useGetShipment';

import styles from './styles.module.css';

function ShipmentInfoDetail({ shipmentId = '', shipmentPopover = {}, id = '' }) {
	const {
		loading = false,
		data = {},
	} = useGetShipment({ shipmentId, shipmentPopover, id });

	const { primary_service_detail = {} } = data || {};

	const {
		cargo_readiness_date = '',
		free_days_detention_destination = 0,
		bl_type = '',
		commodity_description = '',
		estimated_departure = '',
		selected_schedule_arrival = '',
		selected_schedule_departure,
	} = primary_service_detail || {};

	const transitTime = differenceInDays(
		new Date(selected_schedule_arrival || new Date()),
		new Date(selected_schedule_departure || new Date()),
	);

	const checkEmpty = isEmpty(cargo_readiness_date) && !free_days_detention_destination
						&& !bl_type && !commodity_description && isEmpty(estimated_departure)
						&& isEmpty(selected_schedule_arrival) && isEmpty(selected_schedule_departure);

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

	if (checkEmpty) {
		return <div className={styles.loader}>No Data...</div>;
	}

	return (
		<div className={styles.container}>
			{cargo_readiness_date ? (
				<div className={styles.each_content}>
					Cargo Ready:
					<span>
						{formatDate({
							date       : cargo_readiness_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>

				</div>
			) : null}

			{free_days_detention_destination ? (
				<div className={styles.each_content}>
					Destination Detention Free Days:
					<span>
						{free_days_detention_destination}
					</span>
				</div>
			) : null}

			{bl_type ? (
				<div className={styles.each_content}>
					BL Type:
					<span>{startCase(bl_type)}</span>
				</div>
			) : null}

			{commodity_description ? (
				<div className={styles.each_content}>
					Commodity Description:
					<span>{startCase(commodity_description)}</span>
				</div>
			) : null}

			{estimated_departure ? (
				<div className={styles.each_content}>
					Expected Departure:
					<span>
						{formatDate({
							date       : estimated_departure,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</span>
				</div>
			) : null}

			{transitTime ? (
				<div className={styles.each_content}>
					Transit Time:
					<span>{`${transitTime} Days`}</span>
				</div>
			) : null}
		</div>
	);
}

export default ShipmentInfoDetail;
