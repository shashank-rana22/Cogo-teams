import { isEmpty } from '@cogoport/utils';

import useGetCollectionParty from '../hooks/useGetCollectionPartylist';
// import useGetPayableBills from '../hooks/useGetPayableBills';
import useGetShipmentCrossEntityInvoice from '../hooks/useGetShipmentCrossEntityInvoice';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';
import Invoices from './Invoices';
// import CrossEntityInvoice from './CrossEntityInvoices';

function PurchaseInvoicing({ shipmentData = {}, servicesData = [], AddService = () => {} }) {
	const {
		collectionPartyList, collectionPartyLoading,
		refetch,
	} = useGetCollectionParty({
		servicesData,
		shipmentData,
		shipment_id   : shipmentData?.id,
		shipment_type : shipmentData?.shipment_type,
	});

	const {
		data: invoiceDataCE,
		groupedInvoices:groupedInvoicesCE,
		loading:loadingCE,
		refetch:salesInvoicesRefetch,
	} = useGetShipmentCrossEntityInvoice({ shipment_id: shipmentData?.id });

	// const { invoiceList, loading } = useGetPayableBills({ shipment_data: shipmentData });

	if (collectionPartyLoading || loadingCE) {
		return <Loader />;
	}

	return (
		<div>
			{(collectionPartyList || []).map((collectionParty) => (
				<CollectionPartyDetails
					shipmentData={shipmentData}
					collectionParty={collectionParty}
					refetch={refetch}
					servicesData={servicesData}
					key={collectionParty?.id}
					AddService={AddService}
					fullwidth={shipmentData?.shipment_type === 'ftl_freight'}
				/>
			))}

			{/* {(invoiceList || []).map((invoice) => (
				<CrossEntityInvoice
					key={invoice?.id}
					item={invoice}
				/>
			))} */}

			{!loadingCE && !isEmpty(invoiceDataCE) && shipmentData?.shipment_type === 'fcl_freight' ? (
				<Invoices
					invoiceDataCE={invoiceDataCE}
					groupedInvoicesCE={groupedInvoicesCE}
					loadingCE={loadingCE}
					shipmentData={shipmentData}
					salesInvoicesRefetch={salesInvoicesRefetch}
				/>
			) : null}
		</div>
	);
}

export default PurchaseInvoicing;
