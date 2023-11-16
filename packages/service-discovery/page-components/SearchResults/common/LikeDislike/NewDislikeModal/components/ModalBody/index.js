import { useState } from 'react';

import DislikeRate from './components/DislikeRate';
import RequestRate from './components/RequestRate';
import SelectServices from './components/SelectServices';
import styles from './styles.module.css';

const MAPPING = {
	request_rate : RequestRate,
	feedback     : DislikeRate,
};

function ModalBody({ rate = {}, details = {} }) {
	const [selectedSevice, setSelectedSevice] = useState({});

	const { feedback_type = '', service_id = '' } = selectedSevice;

	const ActiveComponent = MAPPING[feedback_type] || DislikeRate;

	return (
		<div className={styles.container}>
			<SelectServices rate={rate} setSelectedSevice={setSelectedSevice} selectedSevice={selectedSevice} />

			<div key={service_id} className={styles.form_container}>
				<ActiveComponent
					selectedSevice={selectedSevice}
					details={details}
					rate={rate}
					setSelectedSevice={setSelectedSevice}
				/>
			</div>
		</div>
	);
}

export default ModalBody;
