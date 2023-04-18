import { Placeholder, Button } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import useListUserChatSummary from '../../../../../hooks/useListUserChatSummary';

import styles from './styles.module.css';

function ExecutiveSummary({
	handleSummary = () => {},
	mobile_no = '',
	sender = '',
	user_id = '',
	lead_user_id = '',
	channel_type = '',
	activeSelect = '',
}) {
	const {
		chatData = {},
		chatSummaryLoading = false,
	} = useListUserChatSummary({
		mobile_no,
		sender,
		user_id,
		lead_user_id,
		channel_type,
		activeSelect,
	});

	const { list = [] } = chatData || {};
	const summaryData = list?.[0];
	const { summary = '' } = summaryData || [];

	if (chatSummaryLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.title}><Placeholder width="70px" height="10px" margin="12px 0 6px 0" /></div>
				<div className={styles.content}>
					<Placeholder width="270px" height="100px" />
				</div>
			</div>
		);
	}

	return (
		!isEmpty(list) && (
			<div className={styles.container}>
				<div className={styles.title}>Executive Summary</div>
				<div className={styles.content}>
					{summary}
				</div>
				<div
					role="button"
					tabIndex={0}
					onClick={handleSummary}
					className={styles.show_button}
				>
					<Button size="md" themeType="secondary">Show More</Button>
				</div>
			</div>
		)
	);
}
export default ExecutiveSummary;
