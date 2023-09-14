import { Button, Tooltip } from '@cogoport/components';

import styles from '../page-components/styles.module.css';

const getCommonColumns = ({ t = () => {} }) => [
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_awb_number')}</div>,
		id       : 'awb_number',
		accessor : (item) => (
			<div className={styles.serial_id}>
				12321
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_origin_airport')}</div>,
		id       : 'origin_airport',
		accessor : (item) => (
			<Tooltip
				placement="bottom"
				content={<div className={styles.tooltip_content}>INDEL</div>}
			>
				<div className={styles.location}>INDEL</div>

			</Tooltip>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_airline')}</div>,
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
		Header   : <div className={styles.header}>{t('amsSubmission:heading_tc_status')}</div>,
		id       : 'tc_status',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				<div>12/09/2022, 4:00 PM</div>
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_action')}</div>,
		id       : 'tc_actions',
		accessor : (item) => (
			<div className={styles.status}>
				<Button
					size="sm"
					onClick={() => setModalData((prev) => (
						{ ...prev, data: item, type: 'submit_lms_data' }))}
				>
					{t('amsSubmission:action_button_submit_lms_data')}
				</Button>
			</div>
		),
	},
];

const getTdStatusColumns = ({ t = () => {}, setModalData = () => {} }) => [
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_td_status')}</div>,
		id       : 'td_status',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				<div>12/09/2022, 4:00 PM</div>
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_chargeable_weight')}</div>,
		id       : 'chargeable_weight',
		accessor : (item) => (
			<div className={styles.shipment_type}>
				300kg
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_action')}</div>,
		id       : 'td_actions',
		accessor : (item) => (
			<div className={styles.status}>
				<Button
					size="sm"
					onClick={() => setModalData((prev) => (
						{ ...prev, data: item, type: 'amend' }))}
				>
					{t('amsSubmission:action_button_amend')}
				</Button>
				<Button
					size="sm"
					onClick={() => setModalData((prev) => (
						{ ...prev, data: item, type: 'send_email' }))}
				>
					{t('amsSubmission:action_button_send_email')}
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
