import { useState } from 'react';

import formatPortPair from '../../../utils/formatPortPair';

import Main from './Main';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Body({ data }) {
	const formattedData = formatPortPair({ item: data });
	const uniqueId = `${
		formattedData[0].origin_code
	} ${formattedData[0].destination_code}`;
	const [activePair, setActivePair] = useState({
		...formattedData[0],
		uniqueId,
	});

	return (
		<div className={styles.body}>
			<SideBar
				data={formattedData}
				activePair={activePair}
				setActivePair={setActivePair}
			/>
			<div className={styles.big_line} />
			<Main activePair={activePair} />
		</div>
	);
}

export default Body;
