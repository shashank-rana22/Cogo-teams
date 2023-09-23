import styles from './styles.module.css';

function Comment({ message = '' }) {
	return (
		<div className={styles.container}>
			Comments:
			{message}
		</div>
	);
}

export default Comment;
