import useGetCollectionParty from '../hooks/useGetCollectionPartylist';
import useGetPayableBills from '../hooks/useGetPayableBills';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';
import CrossEntityInvoice from './CrossEntityInvoices';

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

	const { invoiceList, loading } = useGetPayableBills({ shipment_data: shipmentData });

	if (collectionPartyLoading || loading) {
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
					key={collectionParty.id}
					AddService={AddService}
					fullwidth={shipmentData?.shipment_type === 'ftl_freight'}
				/>
			))}

			{(invoiceList || []).map((invoice) => (
				<CrossEntityInvoice
					key={invoice?.id}
					item={invoice}
				/>
			))}
		</div>
	);
}

export default PurchaseInvoicing;
