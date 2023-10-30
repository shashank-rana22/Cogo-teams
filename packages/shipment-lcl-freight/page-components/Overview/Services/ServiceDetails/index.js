import { cl } from '@cogoport/components';
import React, { useState } from 'react';

import Details from './Details';
import Header from './Header';
import styles from './styles.module.css';

function ServiceDetails({ servicesData = [], activeStakeholder = '' }) {
	const [showDetails, setShowDetails] = useState(false);

	return (

		<div className={cl`${styles[servicesData?.[0]?.state]} ${styles.main_container}`}>
			<Header
				serviceData={servicesData}
				showDetails={showDetails}
				setShowDetails={setShowDetails}
				activeStakeholder={activeStakeholder}
			/>

			{showDetails ? <Details serviceData={servicesData?.[0]} /> : null}
		</div>
	);
}

export default ServiceDetails;
