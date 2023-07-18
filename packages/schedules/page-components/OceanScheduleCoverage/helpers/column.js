import { Button } from '@cogoport/components';
import { format } from '@cogoport/utils';

import styles from '../styles.module.css';

export const getColumns = ({
	setOriginPort,
	setDestinationPort,
	setIsPortToPort,
	setShow,
}) => {
	const setLocations = (item) => {
		setOriginPort(item?.origin_port_id);
		setDestinationPort(item?.destination_port_id);
		setIsPortToPort(true);
	};
	const columns = [
		{
			Header   : 'Origin Port',
			accessor : (item) => (
				<div className={styles.td}>{item?.origin_port?.name}</div>
			),
		},
		{
			Header   : 'Destination Port',
			accessor : (item) => (
				<div className={styles.td}>{item?.destination_port?.name}</div>
			),
		},
		{
			Header   : 'No of Mappings Not Present',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.number_of_mappings_not_present || '-'}
				</div>
			),
		},
		{
			Header   : 'No of Subscriptions',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.number_of_subscriptions || '-'}
				</div>
			),
		},
		{
			Header   : 'No of Shipping Lines Serving',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.number_of_shipping_lines_serving || '-'}
				</div>
			),
		},
		{
			Header   : 'No of Shipping Lines With Schedules Missing',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.number_of_shipping_lines_with_schedules_missing
                        || '-'}
				</div>
			),
		},
		{
			Header   : 'Explore',
			accessor : (item) => (
				<Button
					themeType="sceondary"
					onClick={() => setLocations(item)}
				>
					View Details
				</Button>
			),
		},
	];

	const columnsForPortToPort = [
		{
			Header   : 'Origin Port',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.origin_port?.port_string || '-'}
				</div>
			),
		},
		{
			Header   : 'Destination Port',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.destination_port?.port_string || '-'}
				</div>
			),
		},
		{
			Header   : 'Shipping Line',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.shipping_line?.short_name || '-'}
				</div>
			),
		},
		{
			Header   : 'Is Serviceable',
			accessor : (item) => (
				<div className={styles.td}>{item?.is_serviceable || '-'}</div>
			),
		},
		{
			Header   : 'Explore',
			accessor : (item) => (
				<Button
					themeType="sceondary"
					onClick={() => setShow(item)}
					disabled={item?.patterns?.length === 0}
				>
					View Schedules
				</Button>
			),
		},
	];

	const columnsForPattern = [
		{
			Header   : 'Arrival',
			accessor : (item) => (
				<div className={styles.td}>
					{format(item?.arrival, 'dd MMMM YYYY') || '-'}
				</div>
			),
		},
		{
			Header   : 'Departure',
			accessor : (item) => (
				<div className={styles.td}>
					{format(item?.departure, 'dd MMMM YYYY') || '-'}
				</div>
			),
		},
		{
			Header   : 'No of Stops',
			accessor : (item) => (
				<div className={styles.td}>
					{item?.number_of_stops || '-'}
				</div>
			),
		},
	];

	return { columns, columnsForPortToPort, columnsForPattern };
};
