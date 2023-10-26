import { Tooltip, cl } from '@cogoport/components';
import {
	IcMMissedcall, IcCSendWhatsapp, IcMCall,
} from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PlatFormAdoptionAssign from '../../../../../../../common/PlatFormAdoptionAssign';

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

function CallDetails({ list = [], handlePlaceCall = () => {}, handleOpenMessage = () => {} }) {
	return (list || []).map((item) => {
		const {
			id = '', missed_agent_data = {}, request_type = '', customer = {}, voice_call_data = {},
			serial_id = '', escalation_cycle = '',
		} = item || {};
		const { name = '' } = missed_agent_data || {};
		const {
			name: pocName = '', lead_user_id = '', mobile_country_code = '', mobile_number = '',
			id: pocId = '', whatsapp_country_code = '', email = '', whatsapp_number = '',
		} = customer || {};
		const { reason = '', start_time_of_call = '' } = voice_call_data || {};

		const formattedTime = getTimeDuration(start_time_of_call);

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
							<IcMMissedcall />
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
										{startCase(pocName) || '-'}
									</div>
								</div>
							</div>
						</div>
						<PlatFormAdoptionAssign data={item} type="missed_call" />
						{/* <div className={styles.action}>
							<IcMInfo className={styles.info_icon} />
							<IcMOverflowDot className={styles.info_icon} />
						</div> */}
					</div>
				</div>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Agent Missed by : </div>
						<div className={styles.agent_name}>{startCase(name)}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Missed call at : </div>
						<div className={styles.time}>{formattedTime}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Comments : </div>
						<div className={styles.comment}>
							{reason || '-'}
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
					<div
						role="presentation"
						className={styles.button}
						onClick={() => handlePlaceCall({
							userName   : pocName,
							code       : mobile_country_code,
							number     : mobile_number,
							pocId,
							leadUserId : lead_user_id,
						})}
					>
						<IcMCall width={20} height={20} />
					</div>
				</div>
			</div>

		);
	});
}

export default CallDetails;
