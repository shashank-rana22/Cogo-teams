import React from 'react';

import useGetCollectionParty from '../hooks/useGetCollectionPartylist';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';

function PurchaseInvoicing({ shipmentData = {}, servicesData = [] }) {
	const {
		collectionPartyList, collectionPartyLoading,
		refetch,
	} = useGetCollectionParty({ shipment_id: shipmentData?.id, servicesData });

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
						fullwidth={shipmentData?.shipment_type === 'ftl_freight'}
					/>
				))}
		</div>
	);
}

export default PurchaseInvoicing;
