import { ShipmentDetailContext } from '@cogoport/context';
import PurchaseInvoicing from '@cogoport/purchase-invoicing';
import { useContext } from 'react';

import AddService from '../../commons/AdditionalServices/components/List/AddService';
import ManageServices from '../../commons/ManageServices';

import styles from './styles.module.css';

function PurchaseInvoice() {
	const { shipment_data = {}, servicesList = [] } = useContext(ShipmentDetailContext);

	return (
		<main className={styles.main}>
			<ManageServices isOpen={false} source="purchase" isSeller />
			<PurchaseInvoicing
				shipmentData={shipment_data}
				servicesData={servicesList}
				AddService={AddService}
			/>
		</main>
	);
}

export default PurchaseInvoice;