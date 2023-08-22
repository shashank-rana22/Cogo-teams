import { Button } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import styles from './styles.module.css';

const getFooterMappings = ({ noOfCallsMade = 0, feedBackCount = 0 }) => [
	{
		key        : 'log_call_activity',
		subText    : noOfCallsMade ? `${noOfCallsMade} Calls Made` : 'No Calls Made',
		buttontext : 'create log activity',
	},
	{
		key        : 'lead_org_feedback',
		subText    : feedBackCount ? `${feedBackCount} feedback's created` : 'No feedback\'s created',
		buttontext : 'create feedback',
	},
];

function Footer({ eachItem = {}, openLeadOrgModal = () => {} }) {
	const {
		lead_organization_id = '',
		communication_log_stats = {},
		feedback_count: feedBackCount = 0,
	} = eachItem || {};
	const { call: noOfCallsMade = 0 } = communication_log_stats || {};

	const footerMappings = getFooterMappings({ noOfCallsMade, feedBackCount });

	return (
		<div className={styles.container}>
			{footerMappings.map((item) => {
				const { key = '', subText = '', buttontext = '' } = item || {};

				return (
					<div className={styles.flex_div} key={key}>
						<Button
							size="sm"
							themeType="secondary"
							onClick={() => {
								openLeadOrgModal({ type: key, leadOrgId: lead_organization_id });
							}}
						>
							{buttontext}
						</Button>
						<div className={styles.right_container}>
							{subText}
							<IcMInfo height="13px" width="13px" className={styles.icon_styles} />
						</div>
					</div>
				);
			})}

		</div>
	);
}

export default Footer;
