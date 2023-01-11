import Content from './Content';
import styles from './styles.module.css';

function SideBar({
	data, activePair, setActivePair, handleUpdateContract,
}) {
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
				<Content
					portPair={portPair}
					activePair={activePair}
					handlePortChange={handlePortChange}
					handleUpdateContract={handleUpdateContract}
				/>
			))}
		</div>
	);
}

export default SideBar;
