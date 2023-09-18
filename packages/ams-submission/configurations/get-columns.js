import { Button, Tooltip } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import styles from '../page-components/styles.module.css';

const handleSubmitStatusClick = ({
	submitStatusApiTrigger = () => {},
	item = {},
	state = '',
}) => {
	const payload = {
		masterAirwayBillNumber: item?.master_airway_bill_number,
		state,
	};
	submitStatusApiTrigger({ payload });
};

const handleLmsDataClick = ({ setModalData = () => {}, item = {} }) => {
	setModalData((prev) => (
		{ ...prev, data: item, type: 'submit_lms_data' }));
};

const getCommonColumns = ({ t = () => {} }) => [
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_awb_number')}</div>,
		id       : 'awb_number',
		accessor : (item) => (
			<div className={styles.awb_number}>
				{item?.master_airway_bill_number}
			</div>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_origin_airport')}</div>,
		id       : 'origin_airport',
		accessor : (item) => (
			<Tooltip
				placement="bottom"
				content={<div className={styles.tooltip_content}>{item?.origin}</div>}
			>
				<div className={styles.location}>{item?.origin}</div>

			</Tooltip>
		),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_airline')}</div>,
		id       : 'airline',
		accessor : (item) => (item?.airlineName),
	},
];

const getTcStatusColumns = ({
	t = () => {},
	setModalData = () => {},
	submitStatusApiTrigger = () => {},
	submitStatusLoading = false,
}) => [
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_tc_status')}</div>,
		id       : 'tc_status',
		accessor : (item) => (item?.tcDate || '-'),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_action')}</div>,
		id       : 'tc_actions',
		accessor : (item) => {
			if (isEmpty(item?.amsStatus)) {
				return (
					<Button
						onClick={() => handleLmsDataClick({ setModalData, item })}
					>
						{t('amsSubmission:action_button_submit_lms_data')}
					</Button>
				);
			}
			if (item?.amsStatus === 'completed') {
				return <div className={styles.submit_status}>{t('amsSubmission:action_button_query_submitted')}</div>;
			}

			return (
				<div className={styles.submit_ams_status}>
					{t('amsSubmission:action_button_query_submitted')}
					?
					<Button
						themeType="secondary"
						onClick={() => handleSubmitStatusClick({ submitStatusApiTrigger, item, state: 'confirm' })}
						disabled={submitStatusLoading}
					>
						{t('amsSubmission:action_button_query_submitted_status_yes')}

					</Button>
					<Button
						themeType="secondary"
						disabled={submitStatusLoading}
						onClick={() => handleSubmitStatusClick({ submitStatusApiTrigger, item, state: 'cancelled' })}
					>
						{t('amsSubmission:action_button_query_submitted_status_no')}

					</Button>
				</div>
			);
		},
	},
];

const getTdStatusColumns = ({ t = () => {} }) => [
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_td_status')}</div>,
		id       : 'td_status',
		accessor : (item) => (item?.tdDate || '-'),
	},
	{
		Header   : <div className={styles.header}>{t('amsSubmission:heading_chargeable_weight')}</div>,
		id       : 'chargeable_weight',
		accessor : (item) => (item?.weight || '-'),
	},
];

const getColumns = ({
	t = () => {},
	activeTab = 'tc_status_check',
	setModalData = () => {},
	submitStatusApiTrigger = () => {},
	submitStatusLoading = false,
}) => {
	const commonColumns = getCommonColumns({ t });
	const tcStatusColumns = getTcStatusColumns({
		t,
		setModalData,
		submitStatusApiTrigger,
		submitStatusLoading,
	});
	const tdStatusColumns = getTdStatusColumns({ t });

	return activeTab === 'tc_status_check'
		? [...commonColumns, ...tcStatusColumns] : [...commonColumns, ...tdStatusColumns];
};

export default getColumns;
