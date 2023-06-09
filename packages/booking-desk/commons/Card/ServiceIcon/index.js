import styles from './styles.module.css';

const CLASS_NAMES = {
	FCL         : 'fcl',
	'FCL Local' : 'fcl_local',
	LCL         : 'lcl',
	'FCL CFS'   : 'fcl_cfs',
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
