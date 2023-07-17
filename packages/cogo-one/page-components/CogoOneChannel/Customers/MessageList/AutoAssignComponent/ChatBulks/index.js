import { Button } from '@cogoport/components';

import styles from './styles.module.css';

function ChatBulks({
	selectedAutoAssign = {},
	bulkAssignLoading = false,
	bulkAssignChat = () => {},
	setModalType = () => {},
	isBotSession = false,
}) {
	return (
		<div>
			{
				isBotSession && (
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
			<Button
				size="sm"
				themeType="secondary"
				onClick={() => setModalType({
					type : 'bulk_communication',
					data : {},
				})}
			>
				Template Send
			</Button>
		</div>
	);
}
export default ChatBulks;
