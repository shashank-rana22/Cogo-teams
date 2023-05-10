import React from 'react';

import useGetCollectionParty from '../hooks/useGetCollectionPartylist';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';

function PurchaseInvoicing({ shipmentData, servicesData }) {
	const {
		collectionPartyList, collectionPartyLoading,
		refetch,
	} = useGetCollectionParty({ shipment_id: shipmentData?.id });

	return (
		<div>
			{collectionPartyLoading ? <Loader /> : (
				<>
					{collectionPartyList.map((collectionParty) => (
						<CollectionPartyDetails
							shipmentData={shipmentData}
							collectionParty={collectionParty}
							refetch={refetch}
							servicesData={servicesData}
						/>
					))}
				</>
			)}
		</div>
	);
}

export default PurchaseInvoicing;
