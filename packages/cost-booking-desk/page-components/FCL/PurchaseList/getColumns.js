import { Button, Pill, Tooltip } from '@cogoport/components';
import { IcMPortArrow, IcMFfcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const PILL_COLOR = {
	REQUESTED : '#FEF099',
	APPROVED  : '#C4DC91',
	REJECTED  : '#F8AEA8',
};

const REFUND_PILLS = {
	true  : '#C4DC91',
	false : '#FEF099',
};

const handleClick = ({
	item = {},
	setViewRefundModal = () => {},
	setUpdateRefundModal = () => {},
}) => (item?.reconciled ? setViewRefundModal(item) : setUpdateRefundModal(item));

const getCommonColumns = () => [
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
];

const getPaymentRequestColumns = ({ setViewRequestModal = () => {} }) => [
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
			<div className={styles.status}>
				<Pill color={PILL_COLOR[item?.status]}>
					{item?.status}
				</Pill>
			</div>
		),
	},
	{
		Header   : '',
		key      : 'action',
		id       : 'action',
		accessor : (item) => <Button onClick={() => setViewRequestModal(item)}>View</Button>,
	},
];

const getRefundColumns = ({ setViewRefundModal = () => {}, setUpdateRefundModal = () => {} }) => [
	{
		Header   : <div className={styles.header}>Refund Status</div>,
		key      : 'refund_status',
		id       : 'refund_status',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				<Pill color={REFUND_PILLS[item?.reconciled]}>
					{item?.reconciled ? 'REFUNDED' : 'PENDING'}
				</Pill>
			</div>
		),
	},
	{
		Header   : '',
		key      : 'action',
		id       : 'action',
		accessor : (item) => (
			<Button
				onClick={() => handleClick({ item, setViewRefundModal, setUpdateRefundModal })}
			>
				{item?.reconciled ? 'View' : 'Request'}
			</Button>
		),
	},
];

const getColumns = ({
	paymentActiveTab = 'payment_request',
	setViewRequestModal = () => {},
	setViewRefundModal = () => {},
	setUpdateRefundModal = () => {},
}) => {
	const commonColumns = getCommonColumns();
	const paymentRequestColumns = getPaymentRequestColumns({ setViewRequestModal });
	const refundColumns = getRefundColumns({ setViewRefundModal, setUpdateRefundModal });

	return paymentActiveTab === 'payment_request'
		? [...commonColumns, ...paymentRequestColumns] : [...commonColumns, ...refundColumns];
};

export default getColumns;
