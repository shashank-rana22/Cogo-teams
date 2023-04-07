import { Button, cl } from '@cogoport/components';
import {
	IcMArrowBack,
} from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function AutoAssignComponent({
	autoAssignChats = true,
	setAutoAssignChats = () => {},
	handleAutoAssignBack,
	selectedAutoAssign,
	bulkAssignLoading,
	bulkAssignChat,
}) {
	const count = Object.keys(selectedAutoAssign || {}).length || 0;
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
					Auto Assign Chats
				</Button>
			) : (
				<div className={styles.show_auto_assign}>
					<div className={styles.icon_container}>
						<IcMArrowBack
							onClick={handleAutoAssignBack}
						/>
					</div>
					{isEmpty(selectedAutoAssign)
						? <div className={styles.select_chats}>Select the Chats to be Auto Assigned</div>
						: (
							<>
								<div className={styles.selected_count}>
									<span>
										{count}
									</span>
									Selected
								</div>
								<Button
									size="sm"
									themeType="accent"
									loading={bulkAssignLoading}
									onClick={() => {
										bulkAssignChat({ selectedAutoAssign });
									}}
								>
									Auto Assign
								</Button>

							</>
						)}
				</div>
			)}

		</div>
	);
}
export default AutoAssignComponent;
