import { Toggle } from '@cogoport/components';

import styles from './styles.module.css';

function Header({
	count = 0, completedTaskCount = 0, hideCompletedTasks = false,
	setHideCompletedTasks = () => {},
	showMyTasks = true,
	setShowMyTasks = () => {},
}) {
	return (
		<div className={styles.container}>
			<div className={styles.top_panel}>
				<div className={styles.left_content}>
					{`${completedTaskCount} / ${count} Tasks Completed`}
					{' '}
				</div>
				<div className={styles.right_content}>
					<div className={styles.toggle_container}>
						<div style={{ marginTop: '12px' }}>Hide completed tasks</div>
						<Toggle
							checked={hideCompletedTasks}
							onChange={() => setHideCompletedTasks((prevVal) => !prevVal)}
						/>
					</div>
					<div className={styles.toggle_container}>
						<div style={{ marginTop: '12px' }}>Show only my tasks</div>

						<Toggle checked={showMyTasks} onChange={() => setShowMyTasks((preVal) => !preVal)} />
					</div>
				</div>
			</div>

			<div className={styles.bottom_panel}> Bottom</div>
		</div>
	);
}

export default Header;
