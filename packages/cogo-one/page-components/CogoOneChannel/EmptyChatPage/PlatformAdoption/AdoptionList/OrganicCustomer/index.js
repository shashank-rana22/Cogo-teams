import { Tooltip, Button } from '@cogoport/components';
import { IcMOverflowDot, IcMFtick, IcMCrossInCircle, IcMCalendar } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import AgentAvatar from '../../../../../../common/AgentAvatar';
import { formatAccountType } from '../../../../../../utils/platformAdoption';

import styles from './styles.module.css';

function OrganicCustomer({ list = [], setScheduleDemo = () => {}, setVerifyAccount = () => {} }) {
	return (list || []).map((item) => {
		const { request_type = '', id = '', user = {}, organization = {} } = item || {};
		const { name = '' } = user || {};
		const {
			account_type = '', tags = [], organization_documents = [],
			preferred_languages = [], city = {},
		} = organization || {};
		const { display_name = '' } = city || {};

		return (
			<div className={styles.card} key={id}>
				<div className={styles.header_info}>
					<div className={styles.user_info}>
						<AgentAvatar text="#" />
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
									{startCase(name) || '-'}
								</div>
								<div className={styles.account_type}>
									{formatAccountType({ tags })?.[account_type]?.shortName}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.action}>
						<IcMOverflowDot className={styles.dot_icon} />
					</div>
				</div>
				<div className={styles.body_info}>
					<div className={styles.status_row}>
						<div className={styles.status_content}>
							<div className={styles.title}>Intro Call : </div>
							<IcMFtick fill="#abcd62" width={22} height={22} />
						</div>
						<div className={styles.status_content}>
							<div className={styles.title}>Demo : </div>
							<IcMCrossInCircle fill="#EE3425" width={20} height={20} />
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
					<Button
						size="md"
						themeType="secondary"
						onClick={() => {
							setVerifyAccount((prev) => ({
								...prev,
								show               : true,
								showAccountDetails : true,
								accountData        : organization_documents,
								orgData            : item,
								verifyType         : 'onboard_customer',
								accountType        : formatAccountType({ tags })?.[account_type]?.shortName,
							}));
						}}
					>
						<IcMFtick fill="#abcd62" width={18} height={18} className={styles.schedule_demo_icon} />
						Verify
					</Button>
				</div>
			</div>

		);
	});
}

export default OrganicCustomer;
