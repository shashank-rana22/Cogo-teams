import { Select } from '@cogoport/components';
import React, { useState } from 'react';

import { serviceMappings } from '../../../../configs/AdditionalServicesConfig';
import Incoterms from '../../../../configs/incoterms.json';

import styles from './styles.module.css';

function AdditionalServices({ rateCardData = {} }) {
	const [incoterms, setIncoterms] = useState('');

	const primaryService = rateCardData.service_type;

	// const} = serviceMappings[primaryService];

	const serviceObj = {
		controls     : [],
		name         : '',
		isSelected   : '',
		incoterm     : '',
		title        : '',
		trade_type   : '',
		serviceData  : '',
		service_type : '',
	};

	return (
		<>
			<div className={styles.heading}>
				You may need these services
				<div style={{ fontWeight: 500, display: 'flex', alignItems: 'center' }}>
					IncoTerms
					<Select
						value={incoterms}
						onChange={setIncoterms}
						size="sm"
						options={Incoterms}
						className={styles.select}
					/>
				</div>

			</div>
			<div>
				Additonal services
			</div>
		</>
	);
}

export default AdditionalServices;
