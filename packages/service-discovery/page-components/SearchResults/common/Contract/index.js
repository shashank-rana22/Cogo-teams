import { Modal } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { useState } from 'react';

import LandingPage from './LandingPage';
import RequestContract from './RequestContract';
import styles from './styles.module.css';
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
			closable  : false,
			props     : {
				service: detail?.search_type,
				setShow,
				setScreen,
			},
		},
		request_contract: {
			component : RequestContract,
			closable  : true,
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
			closable  : true,
			props     : {
				detail,
				contractData,
			},
		},
	};

	const onClose = () => setShow(false);

	const { component: ActiveComponent, props = {}, closable = true } = COMPONENTS_MAPPING[screen];

	if (!ActiveComponent) return null;

	return (
		<Modal
			size="lg"
			show={show}
			onClose={onClose}
			placement="top"
			closeOnOuterClick={false}
		>
			<div className={styles.container}>
				{closable ? (
					<IcMCross
						className={styles.cross_button}
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
