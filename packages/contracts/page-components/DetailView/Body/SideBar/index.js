import Content from './Content';
import styles from './styles.module.css';

function SideBar({
	data, activePair, setActivePair, handleUpdateContract,
	statsData
}) {
	const handlePortChange = (val) => {
		if (val?.id !== activePair?.id) {
			setActivePair(val);
		}
	};
	console.log(data, statsData?.port_pair_stats, 'data')

	const newData = [];
	(data || []).forEach((item)=> {
		(statsData?.port_pair_stats	|| []).forEach((child) => {
			if(child?.id == item?.id){
				newData.push({
					...item,
					...child,
				})
			}
		})
	})

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Port Pairs Requested
			</div>
			{newData?.map((portPair) => (
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
