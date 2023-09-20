import styles from './styles.module.css';

function Comment({ message = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				Comments:
				{message}
			</div>
		</div>
	);
}

export default Comment;
