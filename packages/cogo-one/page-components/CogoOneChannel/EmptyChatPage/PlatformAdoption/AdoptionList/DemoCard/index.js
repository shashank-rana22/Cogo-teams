import { Button, Tooltip, Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAWatchDemo, IcMInfo, IcMOverflowDot, IcMPlatformDemo, IcMCalendar, IcMClock } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function DemoCard({ itm = {}, mailProps = {}, setScheduleDemo = () => {} }) {
	const { label, subLabel, accountType, source, requestedBy } = itm || {};
	const { setButtonType, setEmailState, buttonType, signature } = mailProps;

	const handleSendEmail = () => {
		if (buttonType) {
			Toast.warn('Email compose is already in progress');
			return;
		}

		setButtonType('send_mail');
		setEmailState(
			(prev) => ({
				...prev,
				body          : signature,
				rteContent    : '',
				subject       : '',
				toUserEmail   : ['bishal.saha@cogoport.com'],
				ccrecipients  : [],
				bccrecipients : [],
			}),
		);
	};

	return (
		<div className={styles.card}>
			<div className={styles.header_info}>
				<div className={styles.user_info}>
					<IcAWatchDemo />
					<div className={styles.org_details}>
						<Tooltip
							content="Cogoport private logistix limited"
							placement="top"
						>
							<div className={styles.business_name}>
								{label || '-'}
							</div>
						</Tooltip>
						<div className={styles.lower_section}>
							<div className={styles.trade_name}>
								{subLabel || '-'}
							</div>
							<div className={styles.account_type}>{startCase(accountType)}</div>
						</div>
					</div>
				</div>
				<div className={styles.action}>
					<IcMInfo className={styles.info_icon} />
					<IcMOverflowDot className={styles.dot_icon} />
				</div>

			</div>
			<div className={styles.body_info}>
				<div className={styles.each_row}>
					<div className={styles.title}>Requested by :</div>
					<div className={styles.request_name}>{requestedBy}</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Trade Type :</div>
					<div className={styles.source}>
						{source}
						<div className={styles.source_date}>
							{formatDate({
								date       : new Date(),
								dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
								timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
								formatType : 'dateTime',
								separator  : ' | ',
							})}
						</div>
					</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Scheduled at : </div>
					<div className={styles.schedule_time}>
						<IcMCalendar className={styles.calendar_icon} />
						{formatDate({
							date       : new Date(),
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd/MM/yyyy'],
							formatType : 'date',
						})}
						<div className={styles.seperator} />
						<IcMClock className={styles.calendar_icon} />
						{formatDate({
							date       : new Date(),
							timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType : 'time',
						})}
					</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.content}>
						<div className={styles.text}>
							Hema Sawant
							<span>has a demo scheduled at </span>
						</div>
						<div className={styles.merge_button}>Merge</div>
					</div>
				</div>
			</div>
			<div className={styles.line_break} />
			<div className={styles.footer_container}>
				<Button
					size="md"
					themeType="secondary"
					onClick={handleSendEmail}
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
						isScheduleDemo : true,
						scheduleData   : {},
					}))}
				>
					<IcMCalendar fill="grey" className={styles.schedule_demo_icon} />
					Schedule Demo
				</Button>
			</div>
		</div>
	);
}

export default DemoCard;
