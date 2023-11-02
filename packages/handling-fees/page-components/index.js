import { useRouter } from '@cogoport/next';
import { useState } from 'react';

import Header from '../common/Header';

import HandlingFees from './HandlingFees';

function HandlingFeesConfiguration() {
	const router = useRouter();

	const { service } = router.query || {};

	const [activeService, setActiveService] = useState(service || 'fcl_freight');
	return (
		<>
			<Header activeService={activeService} />
			<HandlingFees activeService={activeService} setActiveService={setActiveService} />
		</>
	);
}

export default HandlingFeesConfiguration;
