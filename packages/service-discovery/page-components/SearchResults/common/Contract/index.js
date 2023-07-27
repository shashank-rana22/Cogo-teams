import { Modal } from '@cogoport/components';
import { useState } from 'react';

import LandingPage from './LandingPage';
import RequestContract from './RequestContract';
import Submitted from './SubmittedPage';

function Contract({
	data = {},
	detail = {},
	show = false,
	setShow = () => {},
}) {
	const [screen, setScreen] = useState('landing');
	const [contractData, setContractData] = useState({});

	const COMPONENTS_MAPPING = {
		landing: {
			component : LandingPage,
			props     : {
				setShow,
				setScreen,
			},
		},
		request_contract: {
			component : RequestContract,
			props     : {
				rateData: data,
				detail,
				setShow,
				setScreen,
				setContractData,
			},
		},
		submitted: {
			component : Submitted,
			props     : {
				detail,
				contractData,
			},
		},
	};

	const { component: ActiveComponent, props } = COMPONENTS_MAPPING[screen];

	const onClose = () => setShow(false);

	return (
		<Modal size="lg" show={show} onClose={onClose} placement="top">
			<ActiveComponent {...props} />
		</Modal>
	);
}

export default Contract;
