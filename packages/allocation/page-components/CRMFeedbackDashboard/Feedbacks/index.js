import { useSelector } from '@cogoport/store';
import { useState, useRef } from 'react';

import Header from './components/commons/Header';
import OrganizationCard from './components/commons/OrganizationCard';
import PrimaryTabs from './components/PrimaryTabs';

function Feedbacks() {
	const {
		general: {
			query: {
				organization_id = '',
				organization = '',
				status = '',
				type = '',
			},
		},
	} = useSelector((state) => state);

	const routeDetails = useRef({
		organization,
		organization_id,
		status,
	});

	return (
		<>
			<Header />
			<OrganizationCard ref={routeDetails} />
			<PrimaryTabs organization_id={organization_id} type={type} />
		</>

	);
}

export default Feedbacks;
