import styles from './styles.module.css';

const classNames = {
	LCL           : 'lcl',
	'LCL Customs' : 'lcl_customs',
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
