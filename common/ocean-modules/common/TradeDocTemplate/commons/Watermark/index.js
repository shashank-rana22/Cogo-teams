import styles from './styles.module.css';

function Watermark({ text = 'watermark' }) {
	return (
		<main className={styles.container}>
			<div className={styles.text}>
				{text}
			</div>
		</main>
	);
}

export default Watermark;
