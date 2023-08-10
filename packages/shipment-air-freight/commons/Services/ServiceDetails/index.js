import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import React, { useState } from 'react';

import Details from './Details';
import Header from './Header';
import styles from './styles.module.css';

function ServiceDetails({ servicesData = [] }) {
	const [showDetails, setShowDetails] = useState(false);

	return (

		<div className={cl`${styles[servicesData?.[GLOBAL_CONSTANTS.zeroth_index]?.state]} ${styles.main_container}`}>
			<Header serviceData={servicesData} showDetails={showDetails} setShowDetails={setShowDetails} />

			{showDetails ? <Details serviceData={servicesData?.[GLOBAL_CONSTANTS.zeroth_index]} /> : null}
		</div>
	);
}

export default ServiceDetails;
