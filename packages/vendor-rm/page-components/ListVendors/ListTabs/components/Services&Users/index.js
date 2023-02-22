import { useState } from 'react';

import CompanyPOC from './components/CompanyPOC';
import ServicePOC from './components/ServicePOC';
import Top from './components/Top';
import ShowPocForm from './components/Top/ShowPocForm';
import styles from './styles.module.css';

function ServicesUsers() {
	const [showForm, setShowForm] = useState(false);
	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Top showForm={showForm} setShowForm={setShowForm} />
				{showForm ? <ShowPocForm /> : null}
				<CompanyPOC />
				<ServicePOC />
			</div>
		</div>
	);
}

export default ServicesUsers;
