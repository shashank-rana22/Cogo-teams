import { useSelector } from '@cogoport/store';
import { useRef } from 'react';

import Header from './components/Header';
import OrganizationCard from './components/OrganizationCard';
import PrimaryTabs from './Tabs';

function Responses() {
	const {
		general: {
			query: {
				feedback_request_id = '',
				organization = '',
				third_party = '',
			},
		},
	} = useSelector((state) => state);

	const routeDetails = useRef({ organization, third_party });

	return (
		<>
			<Header ref={routeDetails} />

			<OrganizationCard ref={routeDetails} />

			<PrimaryTabs feedback_request_id={feedback_request_id} />
		</>
	);
}

export default Responses;
