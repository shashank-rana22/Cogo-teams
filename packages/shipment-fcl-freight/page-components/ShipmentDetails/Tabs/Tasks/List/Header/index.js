import styles from './styles.module.css';

function Header({ count = 0, completedTaskCount = 0, setCompletedTaskCount = () => {} }) {
	console.log('fsfsfa', setCompletedTaskCount);
	return (
		<div className={styles.container}>
			<div className={styles.top_panel}>
				<div className={styles.left_panel}>
					{`${completedTaskCount} / ${count} Tasks Completed`}
					{' '}
				</div>
				<div className={styles.right_panel}> Right</div>
			</div>

			<div className={styles.bottom_pane}> Bottom</div>
		</div>
	);
}

export default Header;
