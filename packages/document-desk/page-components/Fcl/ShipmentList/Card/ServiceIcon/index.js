import styles from './styles.module.css';

const classNames = {
	FCL           : 'fcl',
	'FCL Local'   : 'fcl_local',
	'FCL Customs' : 'fcl_customs',
	'FCL CFS'     : 'fcl_cfs',
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
