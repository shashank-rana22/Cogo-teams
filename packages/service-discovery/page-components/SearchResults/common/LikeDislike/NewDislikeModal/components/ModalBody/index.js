import { useState } from 'react';

import FormComponent from './components/FormComponent';
import SelectServices from './components/SelectServices';
import styles from './styles.module.css';

function ModalBody({ rate = {} }) {
	const [selectedSevice, setSelectedSevice] = useState({});

	return (
		<div className={styles.container}>
			<SelectServices rate={rate} setSelectedSevice={setSelectedSevice} selectedSevice={selectedSevice} />

			<div key={selectedSevice.service_id} className={styles.form_container}>
				<FormComponent selectedSevice={selectedSevice} />
			</div>
		</div>
	);
}

export default ModalBody;
