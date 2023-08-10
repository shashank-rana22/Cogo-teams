import { isEmpty } from '@cogoport/utils';

import useGetShipmentInvoicePreference from '../../../../../../hook/useGetShipmentInvoicePreference';
import CardList from '../CardList/index';

import Loader from './Loader/index';
import styles from './styles.module.css';
import { tableColumn } from './tableColumn';

function InvoiceDetail({ shipmentId }) {
	const { data, loading } = useGetShipmentInvoicePreference(shipmentId);
	const invoiceData = data?.invoicing_parties;

	if (loading) {
		return <Loader />;
	}

	return (
		isEmpty(invoiceData)
			? <div className={styles.not_found}>Data Not Found</div>
			:	(
				<CardList
					fields={tableColumn()}
					data={invoiceData}
					key="id"
				/>
			)
	);
}

export default InvoiceDetail;
