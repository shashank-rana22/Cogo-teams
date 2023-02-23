import { Modal } from '@cogoport/components';
import { useState } from 'react';

import AddressModal from './components/AddressModal';
import EnrichmentTable from './components/EnrichmentTable';
import Header from './components/Header';
import PrimaryTabs from './components/PrimaryTabs';
import Statistics from './components/Statistics';
import useListEnrichment from './hooks/useListEnrichment';
import styles from './styles.module.css';

function ListEnrichment() {
	const [activeTab, setActiveTab] = useState('enrichment_requests');

	const {
		columns,
		addressModal,
		setAddressModal,
	} = useListEnrichment();

	return (

		<>
			<div className={styles.title}>Enrichment Data</div>

			<PrimaryTabs activeTab={activeTab} setActiveTab={setActiveTab} />

			<Header activeTab={activeTab} setActiveTab={setActiveTab} />

			{/* <Statistics /> */}

			<EnrichmentTable columns={columns} />

			<Modal
				size="sm"
				placement="top"
				show={addressModal.showModal}
				closeOnOuterClick
				showCloseIcon
				onClose={() => setAddressModal(() => ({
					showModal   : false,
					addressData : '',
				}))}
			>
				<AddressModal addressModal={addressModal} setAddressModal={setAddressModal} />
			</Modal>
		</>

	);
}

export default ListEnrichment;
