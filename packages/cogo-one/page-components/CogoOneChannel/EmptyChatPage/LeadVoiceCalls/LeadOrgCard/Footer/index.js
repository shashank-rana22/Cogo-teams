import { Button } from '@cogoport/components';

import styles from './styles.module.css';

const ONE_ENTRY = 1;
const getFooterMappings = ({ noOfCallsMade = 0, feedBackCount = 0 }) => [
	{
		key     : 'log_call_activity',
		subText : noOfCallsMade ? `${noOfCallsMade} Call log${noOfCallsMade > ONE_ENTRY ? '\'s' : ''} created`
			: 'No call logs created',
		buttontext: 'create log activity',
	},
	{
		key     : 'lead_org_feedback',
		subText : feedBackCount ? `${feedBackCount} feedback${feedBackCount > ONE_ENTRY ? '\'s' : ''} created`
			: 'No feedbacks created',
		buttontext: 'create feedback',
	},
];

function Footer({ eachItem = {}, openLeadOrgModal = () => {} }) {
	const {
		lead_organization_id = '',
		communication_log_stats = {},
		feedback_count: feedBackCount = 0,
		lead_user_id = '',
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
							className={styles.button_styles}
							onClick={() => {
								openLeadOrgModal({
									type       : key,
									leadOrgId  : lead_organization_id,
									leadUserId : lead_user_id,
								});
							}}
						>
							{buttontext}
						</Button>
						<div className={styles.right_container}>
							{subText}
						</div>
					</div>
				);
			})}

		</div>
	);
}

export default Footer;
