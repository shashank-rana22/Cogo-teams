import { Button, Pill, Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcMFfcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const getColumns = ({
	setViewRequestModal = () => {},
}) => [
	{
		Header   : <div className={styles.header}>Shipment ID</div>,
		key      : 'shipment_id',
		id       : 'shipment_id',
		accessor : (item) => (
			<div className={styles.serial_id}>
				{item?.jobNumber ? `#${item?.jobNumber}` : ''}
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>Service Provider</div>,
		key      : 'service_provider',
		id       : 'service_provider',
		accessor : (item) => (
			<div className={styles.service_provider}>{item?.serviceProvider}</div>
		),
	},
	{
		Header   : '',
		key      : 'fcl_logo',
		id       : 'fcl_logo',
		accessor : () => (
			<div className={styles.fcl_logo}>
				<IcMFfcl fill="#ee3425" width={30} height={30} />
				<div className={styles.logo_title}>FCL</div>
			</div>
		),
	},
	{
		Header   : <div className={styles.location_header}>Origin-Destination</div>,
		key      : 'origin',
		id       : 'origin',
		accessor : (item) => (
			<Tooltip
				placement="bottom"
				content={<div>{item?.originLocation}</div>}
			>
				<div className={styles.location}>{item?.originLocation}</div>
			</Tooltip>
		),
	},
	{
		Header   : '',
		key      : 'via',
		id       : 'via',
		accessor : () => <IcMPortArrow />,
	},
	{
		Header   : <div className={styles.location_header} />,
		key      : 'destination',
		id       : 'destination',
		accessor : (item) => (
			<Tooltip
				placement="bottom"
				content={<div>{item?.destinationLocation}</div>}
			>
				<div className={styles.location}>{item?.destinationLocation}</div>
			</Tooltip>
		),
	},
	{
		Header   : <div className={styles.header}>Container Details</div>,
		key      : 'container_details',
		id       : 'container_details',
		accessor : '',
	},
	{
		Header   : <div className={styles.header}>Shipment Type</div>,
		key      : 'shipment_type',
		id       : 'shipment_type',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				<Pill color="#CFEAED">
					{startCase(item?.shipmentType)}
				</Pill>
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>Status</div>,
		key      : 'status',
		id       : 'status',
		accessor : (item) => (
			<div className={styles.status}><Pill color="green">{item?.status}</Pill></div>
		),
	},
	{
		Header   : '',
		key      : 'action',
		id       : 'action',
		accessor : (item) => (
			<Button onClick={() => setViewRequestModal(item)}>View</Button>
		),
	},
];

export default getColumns;
