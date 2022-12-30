import PortPair from '../../../PageView/List/Card/PortPair';

import styles from './styles.module.css';

function SideBar() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Port Pairs Requested
			</div>
			<div className={`${styles.port_pair_active}`}>
				<PortPair />
				<div className={styles.line} />
			</div>
			<div className={`${styles.port_pair}`}>
				<PortPair />
				<div className={styles.line} />
			</div>
			<div className={`${styles.port_pair}`}>
				<PortPair />
				<div className={styles.line} />
			</div>
			<div className={`${styles.port_pair}`}>
				<PortPair />
				<div className={styles.line} />
			</div>
		</div>
	);
}

export default SideBar;
