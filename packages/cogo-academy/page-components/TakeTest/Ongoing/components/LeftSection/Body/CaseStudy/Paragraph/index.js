import styles from './styles.module.css';

function Paragraph({ content }) {
	return (
		<div className={styles.main_container}>
			<div className={styles.header}>
				Read the passage given and answer the Q3 - Q6 on the basis of the passage
			</div>
			<div className={styles.container}>
				{content}
			</div>
		</div>
	);
}

export default Paragraph;
