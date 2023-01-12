import { useState } from 'react';

import useUpdateContractService from '../../../hooks/useUpdateContractService';
import formatPortPair from '../../../utils/formatPortPair';

import Main from './Main';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Body({ data }) {
	const formattedData = formatPortPair({ item: data });

	const [activePair, setActivePair] = useState(
		formattedData[0],
	);

	const { updateContractService } = useUpdateContractService();
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
			/>
			<div className={styles.big_line} />
			<Main activePair={activePair} handleUpdateContract={handleUpdateContractServicer} />
		</div>
	);
}

export default Body;
