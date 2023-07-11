import styles from './styles.module.css';

const CLASS_NAMES = {
	FTL: 'ftl',
};

export default function ServiceIcon({ Icon, text }) {
	return (
		<div className={`${styles.icon_container} ${styles[CLASS_NAMES[text]]}`}>
			<Icon />

			<div className={styles.icon_text}>
				{text}
			</div>
		</div>
	);
}
