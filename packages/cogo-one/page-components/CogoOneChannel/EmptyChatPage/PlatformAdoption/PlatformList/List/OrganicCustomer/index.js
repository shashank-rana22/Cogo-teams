import { Button } from '@cogoport/components';
import { IcMFtick, IcMCrossInCircle, IcMCalendar, IcMCall } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import AgentAvatar from '../../../../../../../common/AgentAvatar';
import Header from '../../Header';

import styles from './styles.module.css';

function OrganicCustomer({ list = [], setScheduleDemo = () => {}, handlePlaceCall = () => {} }) {
	return (list || []).map((item) => {
		const {
			request_type = '', id = '', user = {}, organization = {}, intro_call = {},
			serial_id = '', escalation_cycle = '',
		} = item || {};
		const {
			name = '', mobile_country_code = '', mobile_number = '', lead_user_id = '',
			id: pocId = '',
		} = user || {};
		const {
			account_type = '', tags = [], city = {},
			preferred_languages = [], business_name = '', demo_requested = false,
		} = organization || {};
		const { display_name = '' } = city || {};

		return (
			<div className={styles.card} key={id}>
				<Header
					serialId={serial_id}
					escalationCycle={escalation_cycle}
					icon={<AgentAvatar text={business_name || '#'} />}
					requestType={request_type}
					businessName={business_name}
					tags={tags}
					accountType={account_type}
					item={item}
				/>
				<div className={styles.body_info}>
					<div className={styles.status_row}>
						<div className={styles.status_content}>
							<div className={styles.title}>Intro Call : </div>
							{isEmpty(intro_call) ? <IcMCrossInCircle fill="#EE3425" width={16} height={16} />
								: <IcMFtick fill="#abcd62" width={20} height={20} />}
						</div>
						<div className={styles.status_content}>
							<div className={styles.title}>Demo : </div>
							{demo_requested ? <IcMFtick fill="#abcd62" width={20} height={20} />
								: <IcMCrossInCircle fill="#EE3425" width={16} height={16} />}

						</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.lang_title}>Location : </div>
						<div className={styles.name}>{display_name}</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.lang_title}>Language Preferred : </div>
						<div className={styles.wrapper}>
							{(preferred_languages || []).map((it) => (
								<div key={it} className={styles.lang}>
									{startCase(it)}
								</div>
							))}
						</div>
					</div>
				</div>
				<div className={styles.line_break} />
				<div className={styles.footer_container}>
					{isEmpty(intro_call)
						? (
							<Button
								size="md"
								themeType="secondary"
								onClick={() => setScheduleDemo((prev) => ({
									...prev,
									scheduleType   : 'organic',
									scheduleData   : item,
									isScheduleDemo : true,
								}))}
							>
								<IcMCalendar fill="grey" className={styles.schedule_demo_icon} />
								Schedule Demo
							</Button>
						) : null}
					{!demo_requested ? (
						<div
							role="presentation"
							className={styles.call_icon}
							onClick={() => handlePlaceCall({
								userName   : name,
								code       : mobile_country_code,
								number     : mobile_number,
								pocId,
								leadUserId : lead_user_id,
							})}
						>
							<IcMCall width={18} height={18} fill="#fff" />
						</div>
					) : null}
				</div>
			</div>

		);
	});
}

export default OrganicCustomer;
