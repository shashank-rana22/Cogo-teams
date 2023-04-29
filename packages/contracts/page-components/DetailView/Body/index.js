import { useState, useEffect } from 'react';

import useUpdateContractService from '../../../hooks/useUpdateContractService';

import Main from './Main';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Body({ data, statsData, getContract, getContractStats, formattedData }) {
	const [activePair, setActivePair] = useState(formattedData[0]);

	useEffect(() => {
		if ((formattedData || []).length) {
			setActivePair(formattedData[0]);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(formattedData)]);

	const { updateContractService } = useUpdateContractService({
		getContract,
		getContractStats,
	});
	const handleUpdateContractServicer = ({ payload }) => {
		updateContractService({ payload });
	};
	return (
		<div className={styles.body}>
			<SideBar
				data={formattedData}
				activePair={activePair}
				setActivePair={setActivePair}
				handleUpdateContract={handleUpdateContractServicer}
				statsData={statsData}
				mainData={data}
			/>
			<div className={styles.big_line} />
			<Main
				activePair={activePair}
				handleUpdateContract={handleUpdateContractServicer}
				data={data}
				statsData={statsData}
			/>
		</div>
	);
}

export default Body;
