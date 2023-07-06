import { Pill, Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import { differenceInSeconds } from 'date-fns';

import styles from './styles.module.css';
import FieldPair from './TableItems/FieldPair';
import renderButton from './TableItems/renderButton';
import renderPortPair from './TableItems/renderPortPair';
import SearchType from './TableItems/SearchType';
import renderShipment from './TableItems/ShipmentDetails';

const getTableColumnFunction = (key) => {
	const newFunction = {
		renderButton,
		renderSerialId: (itemData) => {
			const { serial_id = '-', performed_by_type } = itemData || {};

			return (
				<div>
					<strong>{serial_id}</strong>
					{performed_by_type ? (
						<div>{performed_by_type === 'user' ? 'Organic' : 'Inorganic'}</div>
					) : null}
				</div>
			);
		},
		renderSearchType: (itemData, field) => (
			<SearchType item={itemData} field={field} />
		),
		renderFieldPair: (itemData, field) => (
			<FieldPair item={itemData} field={field} />
		),
		renderPortPair,
		renderShipment,
		renderCreated: (itemData) => (
			<Tooltip
				content={(
					<>
						{formatDate({
							date       : itemData.created_at,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
						})}
					</>
				)}
				placement="top"
			>
				<span>
					{formatDate({
						date       : itemData.created_at,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
				</span>
			</Tooltip>
		),
		renderSource: (itemData) => {
			const { source = '-' } = itemData || {};
			console.log(itemData);

			return (
				<Pill size="md" color="#F7FAEF">
					{source === 'direct' ? 'Sell Without Buy' : startCase(source)}
				</Pill>
			);
		},
		renderValidityEnd: ({ shipment_id, validity_end }) => {
			if (shipment_id) {
				return <span>NA</span>;
			}

			return (
				<div>
					{formatDate({
						date       : validity_end,
						dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						formatType : 'date',
					})}
					<br />
					{formatDate({
						date       : validity_end,
						timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm'],
						formatType : 'time',
					})}
				</div>
			);
		},
		renderBookingStatus: (itemData) => {
			const { shipment_id, quotation_email_sent_at, validity_end } = itemData || {};

			const validityTime = differenceInSeconds(
				new Date(validity_end),
				new Date(),
			);

			if (shipment_id) {
				return <div className={styles.booking_status}><Pill size="md" color="green">Booked</Pill></div>;
			}

			if (quotation_email_sent_at && validityTime > 0) {
				return (
					<div className={styles.booking_status}>
						<Pill size="md" color="yellow">Sent & Not Booked</Pill>
					</div>
				);
			}

			return (
				<div className={styles.booking_status}>
					<Pill size="md" color="red">Expired</Pill>
				</div>
			);
		},
		renderShipmentStatus: ({ state = '-' }) => (
			<div className={`${styles.status_tag} ${styles[state]}`}>
				<span>{startCase(state)}</span>
			</div>
		),
		renderLastMileStone: ({ last_completed_task }) => {
			const { task = '-' } = last_completed_task || {};

			if (!last_completed_task) return <div>-</div>;

			return <div>{startCase(task)}</div>;
		},
		renderNextMileStone: ({ next_pending_task }) => {
			const { task = '-' } = next_pending_task || {};

			if (!next_pending_task) return <div>-</div>;

			return <div>{startCase(task)}</div>;
		},
	};

	return newFunction[key];
};
export default getTableColumnFunction;
