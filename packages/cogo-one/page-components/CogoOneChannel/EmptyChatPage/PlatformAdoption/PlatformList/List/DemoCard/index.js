import { Button, Tooltip, Toast, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAWatchDemo, IcMPlatformDemo, IcMCalendar, IcMClock } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import PlatFormAdoptionAssign from '../../../../../../../common/PlatFormAdoptionAssign';
import { formatAccountType } from '../../../../../../../utils/platformAdoption';

import styles from './styles.module.css';

// const YOUTUBE_LINK = `<video controls>
//   	<source src="https://www.youtube.com/embed/MNjRdcPuweY?si=19bno9T8O8QraUe5" type="video/webm">
//   </video>`;

const YOUTUBE_LINK = `<a
	href="https://www.youtube.com/watch?v=MNjRdcPuweY&ab_channel=Cogoport"
	rel="noopener noreferrer" target="_blank">Demo Tutorial Link</a>`;

function DemoCard({ list = [], mailProps = {}, setScheduleDemo = () => {} }) {
	const { setButtonType, setEmailState, buttonType, signature } = mailProps;

	const { performedById = '' } = useSelector(({ profile }) => ({
		performedById: profile.user.id || {},
	}));

	const handleSendEmail = ({ email = '', calendar_id = '', scheduleId = '' }) => {
		if (buttonType) {
			Toast.warn('Email compose is already in progress');
			return;
		}

		setButtonType('send_mail');
		setEmailState(
			(prev) => ({
				...prev,
				body          : signature,
				rteContent    : YOUTUBE_LINK,
				subject       : '',
				toUserEmail   : [email],
				ccrecipients  : [],
				bccrecipients : [],
				emailDemoData : {
					agentId    : performedById,
					calendarId : calendar_id,
					isEmail    : true,
					scheduleId,
					source     : 'email_demo',
				},
			}),
		);
	};

	return (list || []).map((item) => {
		const {
			id = '', request_type = '', organization = {}, source = '', request_submitted_by = {},
			performed_by_type = '', serial_id = '', metadata = {}, escalation_cycle = '',
		} = item || {};
		const { account_type = '', business_name = '', tags = [] } = organization || {};
		const { name = '', email = '' } = request_submitted_by || {};
		const { schedule = {}, category = '' } = metadata || {};
		const { schedule_start = '', calendar_id = '', id: scheduleId = '' } = schedule || {};

		return (
			<div className={styles.card} key={id}>
				<div className={styles.header_info}>
					<div className={styles.cycle_section}>
						<div className={styles.serail_id}>
							ID :
							{' '}
							{serial_id}
						</div>
						{escalation_cycle ? (
							<div className={cl`${styles.cycle} ${escalation_cycle === 'warning'
								? styles.warning : styles.escalate}`}
							>
								{startCase(escalation_cycle)}
							</div>
						) : null}
					</div>
					<div className={styles.wrap}>
						<div className={styles.user_info}>
							<IcAWatchDemo />
							<div className={styles.org_details}>
								<Tooltip
									content="Cogoport private logistix limited"
									placement="top"
								>
									<div className={styles.business_name}>
										{startCase(request_type) || '-'}
									</div>
								</Tooltip>
								<div className={styles.lower_section}>
									<div className={styles.trade_name}>
										{startCase(business_name) || '-'}
									</div>
									<div className={styles.account_type}>
										{formatAccountType({ tags })?.[account_type]?.shortName}
									</div>
								</div>
							</div>
						</div>
						<PlatFormAdoptionAssign data={item} type="demo_request" />
						{/* <div className={styles.action}>
							<IcMInfo className={styles.info_icon} />
							<IcMOverflowDot className={styles.dot_icon} />
						</div> */}
					</div>
				</div>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Requested by :</div>
						<div className={styles.request_name}>
							{name}
							{' '}
							<span>{`(${startCase(performed_by_type)})`}</span>
						</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Source :</div>
						<div className={styles.source}>
							{startCase(source)}
							{/* <div className={styles.source_date}>
						</div> */}
						</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Category : </div>
						<div className={styles.request_name}>{startCase(category) || '-'}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Scheduled at : </div>
						<div className={styles.schedule_time}>
							<IcMCalendar className={styles.calendar_icon} />
							{formatDate({
								date       : schedule_start,
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
								formatType : 'date',
							})}
							<div className={styles.seperator} />
							<IcMClock className={styles.calendar_icon} />
							{formatDate({
								date       : schedule_start,
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'time',
							})}
						</div>
					</div>
				</div>
				<div className={styles.line_break} />
				<div className={styles.footer_container}>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => handleSendEmail({ email, scheduleId, calendar_id })}
					>
						<IcMPlatformDemo
							fill="grey"
							className={styles.schedule_demo_icon}
						/>
						Email Demo
					</Button>
					<Button
						size="md"
						themeType="secondary"
						onClick={() => setScheduleDemo((prev) => ({
							...prev,
							scheduleType   : 'demo',
							scheduleData   : item,
							isScheduleDemo : true,
						}))}
					>
						<IcMCalendar fill="grey" className={styles.schedule_demo_icon} />
						Schedule Demo
					</Button>
				</div>
			</div>
		);
	});
}

export default DemoCard;
