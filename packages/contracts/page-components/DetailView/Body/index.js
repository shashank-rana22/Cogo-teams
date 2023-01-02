import { useState } from 'react';

import Main from './Main';
import SideBar from './SideBar';
import styles from './styles.module.css';

function Body({ data }) {
	const uniqueId = `${
		data?.fcl_freight_services[0]?.service_details[0].origin_port_id
	} ${data?.fcl_freight_services[0]?.service_details[0].destination_port_id}`;
	const [activePair, setActivePair] = useState({ ...data?.fcl_freight_services[0]?.service_details[0], uniqueId });
	return (
		<div className={styles.body}>
			<SideBar
				data={data?.fcl_freight_services[0]?.service_details}
				activePair={activePair}
				setActivePair={setActivePair}
			/>
			<div className={styles.big_line} />
			<Main activePair={activePair} />
		</div>
	);
}

export default Body;
