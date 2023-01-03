import PortPair from '../../../PageView/List/Card/PortPair';

import styles from './styles.module.css';

function SideBar({ data, activePair, setActivePair }) {
	const handlePortChange = (val) => {
		if (val?.uniqueId !== activePair?.uniqueId) {
			setActivePair(val);
		}
	};
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Port Pairs Requested
			</div>
			{data?.map((portPair) => (
				<div
					className={activePair?.uniqueId === `${portPair?.origin_code} ${portPair?.destination_code}`
						? styles.port_pair_active : ''}
				>
					<div className={styles.pair}>
						<PortPair portPair={portPair} handlePortChange={handlePortChange} detailView />
						<div className={styles.line} />
					</div>
				</div>
			))}
		</div>
	);
}

export default SideBar;
