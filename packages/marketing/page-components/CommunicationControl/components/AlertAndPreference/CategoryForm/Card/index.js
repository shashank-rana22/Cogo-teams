import styles from './styles.module.css';

function Card({ children = {}, title = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.title}>{title}</div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	);
}
export default Card;
