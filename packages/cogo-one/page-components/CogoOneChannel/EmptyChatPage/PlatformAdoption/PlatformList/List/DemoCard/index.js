import { Button, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAWatchDemo, IcMPlatformDemo, IcMCalendar, IcMClock } from '@cogoport/icons-react';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import Header from '../../Header';

import styles from './styles.module.css';

const YOUTUBE_LINK = `<a
	href="https://www.youtube.com/watch?v=MNjRdcPuweY&ab_channel=Cogoport"
	rel="noopener noreferrer" target="_blank">Demo Tutorial Link</a>`;

function DemoCard({ list = [], mailProps = {}, setScheduleDemo = () => {} }) {
	const { setButtonType, setEmailState, buttonType, signature } = mailProps;

	const { performedById = '' } = useSelector(({ profile }) => ({
		performedById: profile.user.id || {},
	}));

	const handleSendEmail = ({ email = '', calendar_id = '', scheduleId = '', id = '' }) => {
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
					requestId  : id,
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
				<Header
					serialId={serial_id}
					escalationCycle={escalation_cycle}
					icon={<IcAWatchDemo width={30} height={30} />}
					requestType={request_type}
					businessName={business_name}
					tags={tags}
					accountType={account_type}
					item={item}
				/>
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
						onClick={() => handleSendEmail({ email, scheduleId, calendar_id, id })}
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
