import { useState } from 'react';

import CompanyPOC from './components/CompanyPOC';
import ServicePOC from './components/ServicePOC';
import Top from './components/Top';
// import ShowPocForm from './components/Top/ShowPocForm';
import COMPONENT_MAPPING from './components/Top/utils/component-mapping';
import styles from './styles.module.css';

function ServicesUsers({
	data = {},
}) {
	const [showForm, setShowForm] = useState('');

	const Component = COMPONENT_MAPPING[showForm];

	return (
		<div className={styles.padd}>

			<div className={styles.main}>
				<Top showForm={showForm} setShowForm={setShowForm} />
				{/* {showForm ? <ShowPocForm /> : null} */}

				{
					Component && (
						<Component setShowForm={setShowForm} getVendorData={data} />
					)
				}

				<CompanyPOC />

				<ServicePOC />
			</div>
		</div>
	);
}

export default ServicesUsers;
