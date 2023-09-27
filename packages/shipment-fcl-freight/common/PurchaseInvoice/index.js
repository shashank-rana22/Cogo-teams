import { ShipmentDetailContext } from '@cogoport/context';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { useContext } from 'react';

import AddService from '../AdditionalServices/components/List/AddService';
import OverviewManageServices from '../Overview/OverviewManageServices';

import styles from './styles.module.css';

function PurchaseInvoice({ activeTab = '' }) {
	const { shipment_data, servicesList } = useContext(ShipmentDetailContext);

	return (
		<main className={styles.main}>
			<OverviewManageServices isOpen={false} activeTab={activeTab} source="purchase" isSeller />
			<PurchaseInvoicing
				shipmentData={shipment_data}
				servicesData={servicesList}
				AddService={AddService}
			/>
		</main>
	);
}

export default PurchaseInvoice;
