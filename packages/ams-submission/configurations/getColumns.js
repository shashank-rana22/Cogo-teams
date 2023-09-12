import { Button, Tooltip } from '@cogoport/components';

import styles from '../page-components/styles.module.css';

const getCommonColumns = ({ t = () => {} }) => [
	{
		Header   : <div className={styles.header}>AWB Number</div>,
		id       : 'awb_number',
		accessor : (item) => (
			<div className={styles.serial_id}>
				12321
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>Origin Airport</div>,
		id       : 'origin_airport',
		accessor : (item) => (
			<Tooltip
				placement="bottom"
				content={<div>INDEL</div>}
			>
				<div className={styles.location}>INDEL</div>

			</Tooltip>
		),
	},
	{
		Header   : <div className={styles.header}>Airline</div>,
		id       : 'airline',
		accessor : () => (
			<div className={styles.fcl_logo}>
				<div className={styles.service_provider}>Vistara</div>
			</div>
		),
	},
];

const getTcStatusColumns = ({ t = () => {}, setModalData = () => {} }) => [
	{
		Header   : <div className={styles.header}>TC Status</div>,
		id       : 'tc_status',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				<div>12/09/2022, 4:00 PM</div>
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>Action</div>,
		id       : 'tc_actions',
		accessor : (item) => (
			<div className={styles.status}>
				<Button size="sm" onClick={setModalData}>
					Submit LMS Data
				</Button>
			</div>
		),
	},
];

const getTdStatusColumns = ({ t = () => {}, setModalData = () => {} }) => [
	{
		Header   : <div className={styles.header}>TD Status</div>,
		id       : 'td_status',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				<div>12/09/2022, 4:00 PM</div>
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>Chargeable Weight</div>,
		id       : 'chargeable_weight',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				300kg
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>Action</div>,
		id       : 'td_actions',
		accessor : (item) => (
			<div className={styles.status}>
				<Button size="sm">
					Amend
				</Button>
			</div>
		),
	},
];

const getColumns = ({
	t = () => {},
	activeTab = 'tc_status_check',
	modalData = {},
	setModalData = () => {},
}) => {
	const commonColumns = getCommonColumns({ t });
	const tcStatusColumns = getTcStatusColumns({ t, setModalData });
	const tdStatusColumns = getTdStatusColumns({ t, setModalData });

	return activeTab === 'tc_status_check'
		? [...commonColumns, ...tcStatusColumns] : [...commonColumns, ...tdStatusColumns];
};

export default getColumns;
