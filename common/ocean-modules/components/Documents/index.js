import { ShipmentDetailContext } from '@cogoport/context';
import { React, useState, useContext } from 'react';

import useCreateTaskList from '../../hooks/useCreateTaskList';
import useGetShipmentMails from '../../hooks/useListRpaMails';

import CheckList from './CheckList';
import HeaderComponent from './Header';
import styles from './styles.module.css';
import Wallet from './Wallet';

function Documents() {
	const [activeToggle, setActiveToggle] = useState(false);
	const [activeWallet, setActiveWallet] = useState('trade_documents');
	const { shipment_data, primary_service } = useContext(ShipmentDetailContext);

	const {
		loading,
		taskList,
		completedDocs,
		docTypes,
		filters,
		setFilters,
	} = useCreateTaskList({ shipment_data, primary_service });

	const emailPayload = {
		cogo_shipment_id : shipment_data?.id,
		entity_type      : docTypes,
	};

	const { emailList } = useGetShipmentMails({
		payload: emailPayload,
	});

	return (
		<div className={styles.main_container}>
			<HeaderComponent
				activeToggle={activeToggle}
				setActiveToggle={setActiveToggle}
				shipment_data={shipment_data}
				data={completedDocs?.organizations}
				filters={filters}
				setFilters={setFilters}
				activeWallet={activeWallet}
				setActiveWallet={setActiveWallet}
			/>

			{!activeToggle ? (
				<CheckList
					data={taskList}
					loading={loading}
					emailDocs={emailList}
					completedDocs={completedDocs?.list}
				/>
			) : <Wallet activeWallet={activeWallet} />}

		</div>
	);
}

export default Documents;
