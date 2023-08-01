import { Modal } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import LandingPage from './LandingPage';
import RequestContract from './RequestContract';
import styles from './styles.module.css';
import Submitted from './SubmittedPage';

const SCREENS_TO_SHOW_CROSS_IN = ['landing', 'request_contract'];

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
				rateCardId: data?.id,
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
			<div className={styles.container}>
				{SCREENS_TO_SHOW_CROSS_IN.includes(screen) ? (
					<IcMCross
						className={styles.cross_icn}
						width={20}
						height={20}
						onClick={onClose}
					/>
				) : null}

				<ActiveComponent {...props} />
			</div>
		</Modal>
	);
}

export default Contract;
