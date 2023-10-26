import { ShipmentDetailContext } from '@cogoport/context';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { useContext, useState } from 'react';

import AddService from '../AdditionalServices/components/List/AddService';
import OverviewManageServices from '../Overview/OverviewManageServices';

import styles from './styles.module.css';

function PurchaseInvoice({ activeTab = '' }) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	const [collectionPartyData, setCollectionPartyData] = useState([]);

	return (
		<main className={styles.main}>
			<OverviewManageServices
				isOpen={false}
				activeTab={activeTab}
				source="purchase"
				collectionPartyList={collectionPartyData}
				isSeller
			/>
			<PurchaseInvoicing
				shipmentData={shipment_data}
				servicesData={servicesList}
				AddService={AddService}
				setCollectionPartyData={setCollectionPartyData}
			/>
		</main>
	);
}

export default PurchaseInvoice;
