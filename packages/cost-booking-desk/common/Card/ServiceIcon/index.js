import styles from './styles.module.css';

const classNames = {
	FCL           : 'fcl',
	'FCL Local'   : 'fcl_local',
	LCL           : 'lcl',
	'FCL Customs' : 'fcl_customs',
	'LCL Customs' : 'lcl_customs',
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
