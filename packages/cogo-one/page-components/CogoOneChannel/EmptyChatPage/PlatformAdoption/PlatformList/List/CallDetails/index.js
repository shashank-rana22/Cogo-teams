import { IcMMissedcall, IcCSendWhatsapp, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { CallInfoContent } from '../../../../../../../constants/platformAdoptionConstant';
import Header from '../../Header';

import styles from './styles.module.css';

function getTimeDuration(date) {
	const currentDate = new Date();
	const inputDate = new Date(date);
	const timeDifference = currentDate - inputDate;
	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);
	const months = Math.floor(days / 30);

	if (months >= 1) {
		return `${months} month${months > 1 ? 's' : ''} ago`;
	} if (days >= 1) {
		return `${days} day${days > 1 ? 's' : ''} ${hours % 24} hrs ${minutes % 60} min ago`;
	} if (hours >= 1) {
		return `${hours} hr${hours > 1 ? 's' : ''} ${minutes % 60} min ago`;
	} if (minutes >= 1) {
		return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
	}
	return `${seconds} sec${seconds > 1 ? 's' : ''} ago`;
}

function CallDetails({ item = {}, handlePlaceCall = () => {}, handleOpenMessage = () => {}, initialViewType = '' }) {
	const {
		missed_agent_data = {}, request_type = '', customer = {}, voice_call_data = {},
		serial_id = '', escalation_cycle = '', metadata = {}, request_assigned_to = '',
	} = item || {};
	const { name = '' } = missed_agent_data || {};
	const { name: requestName = '' } = request_assigned_to || {};
	const {
		name: pocName = '', lead_user_id = '', mobile_country_code = '', mobile_number = '',
		id: pocId = '', whatsapp_country_code = '', email = '', whatsapp_number = '',
	} = customer || {};
	const { start_time_of_call = '' } = voice_call_data || {};
	const { last_comm_log = {} } = metadata || {};
	const { communication_summary = '' } = last_comm_log || {};

	const formattedTime = getTimeDuration(start_time_of_call);

	return (
		<div className={styles.card}>
			<Header
				item={item}
				icon={<IcMMissedcall width={25} height={25} fill="#ee3425" />}
				serialId={serial_id}
				escalationCycle={escalation_cycle}
				requestType={request_type}
				businessName={pocName}
				content={<CallInfoContent />}
				initialViewType={initialViewType}
			/>
			<div className={styles.body_info}>
				<div className={styles.each_row}>
					<div className={styles.title}>Agent Missed by : </div>
					<div className={styles.agent_name}>{startCase(name)}</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Request Agent : </div>
					<div className={styles.agent_name}>{startCase(requestName)}</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Missed call at : </div>
					<div className={styles.time}>{formattedTime}</div>
				</div>
				<div className={styles.each_row}>
					<div className={styles.title}>Comments : </div>
					<div className={styles.comment}>
						{communication_summary || '-'}
					</div>
				</div>
			</div>
			<div className={styles.line_break} />
			<div className={styles.footer_container}>
				<div
					className={styles.button}
					role="presentation"
					onClick={() => handleOpenMessage({
						number     : mobile_number,
						code       : mobile_country_code,
						userName   : pocName,
						leadUserId : lead_user_id,
						whatsapp_country_code,
						email,
						whatsapp_number,
						pocId,
					})}
				>
					<IcCSendWhatsapp width={20} height={20} />
				</div>
				{mobile_number ? (
					<div
						role="presentation"
						className={styles.button}
						onClick={() => handlePlaceCall({
							userName     : pocName,
							code         : mobile_country_code,
							number       : mobile_number,
							pocId,
							leadUserId   : lead_user_id,
							isUnkownUser : true,
						})}
					>
						<IcMCall width={20} height={20} />
					</div>
				) : null}
			</div>
		</div>

	);
}

export default CallDetails;
