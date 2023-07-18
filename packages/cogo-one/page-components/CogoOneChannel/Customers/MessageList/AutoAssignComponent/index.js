import { Button, cl, Popover } from '@cogoport/components';
import { IcMListView, IcMArrowBack } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import ChatBulks from './ChatBulks';
import styles from './styles.module.css';

const ZERO_COUNT = 0;

function AutoAssignComponent({
	autoAssignChats = true,
	setAutoAssignChats = () => {},
	handleAutoAssignBack = () => {},
	selectedAutoAssign = {},
	bulkAssignLoading = false,
	bulkAssignChat = () => {},
	setModalType = () => {},
	isBotSession = false,
}) {
	const [popoverVisible, setPopoverVisible] = useState(false);
	const count = Object.keys(selectedAutoAssign || {}).length || ZERO_COUNT;

	return (
		<div className={cl`${styles.auto_assign_container} ${!autoAssignChats ? styles.auto_assign_background : ''}`}>
			{ autoAssignChats ? (
				<Button
					size="sm"
					themeType="secondary"
					onClick={() => {
						setAutoAssignChats(false);
					}}
				>
					Bulk Select
				</Button>
			) : (
				<div className={styles.show_auto_assign}>
					<div className={styles.icon_container}>
						<IcMArrowBack
							onClick={handleAutoAssignBack}
						/>
					</div>
					{isEmpty(selectedAutoAssign)
						? <div className={styles.select_chats}>Select Chat Bulks</div>
						: (
							<>
								<div className={styles.selected_count}>
									<span>
										{count}
									</span>
									Selected
								</div>
								<Popover
									placement="right"
									trigger="click"
									render={(
										<ChatBulks
											bulkAssignLoading={bulkAssignLoading}
											bulkAssignChat={bulkAssignChat}
											selectedAutoAssign={selectedAutoAssign}
											setModalType={setModalType}
											isBotSession={isBotSession}
											setPopoverVisible={setPopoverVisible}
										/>
									)}
									visible={popoverVisible}
									onClickOutside={() => setPopoverVisible((prev) => !prev)}
								>
									<Button
										size="sm"
										themeType="secondary"
										className={styles.action_button}
										onClick={() => setPopoverVisible((prev) => !prev)}

									>
										<IcMListView height={15} width={15} />
										<div className={styles.action_label}>Actions</div>
									</Button>
								</Popover>

							</>
						)}
				</div>
			)}

		</div>
	);
}
export default AutoAssignComponent;
