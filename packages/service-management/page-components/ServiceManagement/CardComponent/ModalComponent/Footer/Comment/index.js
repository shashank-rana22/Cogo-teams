import styles from './styles.module.css';

function Comment({ service_comment = '' }) {
	return (
		<div className={styles.text}>
			Comments:
			{service_comment}
		</div>
	);
}

export default Comment;
