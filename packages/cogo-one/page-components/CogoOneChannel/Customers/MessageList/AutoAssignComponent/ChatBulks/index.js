import { Button } from '@cogoport/components';

import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../../../constants/viewTypeMapping';

import styles from './styles.module.css';

function ChatBulks({
	selectedAutoAssign = {},
	bulkAssignLoading = false,
	bulkAssignChat = () => {},
	isBotSession = false,
	setPopoverVisible = () => {},
	viewType = '',
	setSendBulkTemplates = () => {},
}) {
	const bulkSendActions = VIEW_TYPE_GLOBAL_MAPPING[viewType]?.bulk_assign_features;

	return (
		<div>
			{
				isBotSession && bulkSendActions.includes('bulk_auto_assign') && (
					<Button
						size="sm"
						themeType="secondary"
						loading={bulkAssignLoading}
						className={styles.popover_button}
						onClick={() => {
							bulkAssignChat({ selectedAutoAssign });
						}}
					>
						Auto Assign
					</Button>
				)
			}
			{bulkSendActions.includes('bulk_send_templates') && (
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => {
						setPopoverVisible((prev) => !prev);
						setSendBulkTemplates(true);
					}}
					className={styles.popover_button}
				>
					Template Send
				</Button>
			)}
		</div>
	);
}
export default ChatBulks;
