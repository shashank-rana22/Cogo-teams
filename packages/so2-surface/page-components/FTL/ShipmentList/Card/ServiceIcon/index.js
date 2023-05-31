import styles from './styles.module.css';

const classNames = {
	FTL: 'ftl',
};

export default function ServiceIcon({ Icon, text }) {
	return (
		<div className={`${styles.icon_container} ${styles[classNames[text]]}`}>
			<Icon />

			<div className={styles.icon_text}>
				{text}
			</div>
		</div>
	);
}
