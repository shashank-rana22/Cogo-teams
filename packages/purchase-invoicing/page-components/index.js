import useGetCollectionParty from '../hooks/useGetCollectionPartylist';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';

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

	if (collectionPartyLoading) {
		return <Loader />;
	}
	return (
		(collectionPartyList || []).map((collectionParty) => (
			<CollectionPartyDetails
				shipmentData={shipmentData}
				collectionParty={collectionParty}
				refetch={refetch}
				servicesData={servicesData}
				key={collectionParty.id}
				AddService={AddService}
				fullwidth={shipmentData?.shipment_type === 'ftl_freight'}
			/>
		))
	);
}

export default PurchaseInvoicing;
