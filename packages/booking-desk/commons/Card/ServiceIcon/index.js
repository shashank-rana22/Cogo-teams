import styles from './styles.module.css';

const CLASS_NAMES = {
	FCL          : 'red',
	'FCL Local'  : 'red',
	'FCL CFS'    : 'red',
	'FCL Custom' : 'red_faded',
	LCL          : 'red_faded',
};

export default function ServiceIcon({ Icon, text }) {
	return (
		<div className={`${styles.icon_container} ${styles[CLASS_NAMES[text]]}`}>
			{Icon ? <Icon /> : null}

			<div className={styles.icon_text}>
				{text}
			</div>
		</div>
	);
}
