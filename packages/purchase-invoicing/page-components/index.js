import useGetCollectionParty from '../hooks/useGetCollectionPartylist';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';

function PurchaseInvoicing({ shipmentData = {}, servicesData = [], AddService = () => {} }) {
	const {
		collectionPartyList, collectionPartyLoading,
		refetch,
	} = useGetCollectionParty({ servicesData, shipmentData, shipment_id: shipmentData?.id });

	return (
		<div>
			{collectionPartyLoading ? (<Loader />)
				: (collectionPartyList || []).map((collectionParty) => (
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
		</div>
	);
}

export default PurchaseInvoicing;
