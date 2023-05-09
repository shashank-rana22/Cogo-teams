import React from 'react';

import AccordianView from '../common/Accordianview';
import useGetCollectionParty from '../hooks/useGetCollectionPartylist';

import AdditionalServiceList from './AdditionalServiceList';
import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';

function PurchaseInvoicing({ shipmentData, servicesData }) {
	const {
		collectionPartyList, collectionPartyLoading,
		refetch,
	} = useGetCollectionParty({ shipment_id: shipmentData?.id });

	const isEdit = false;
	return (
		<div>
			<AccordianView title="Manage Services" open={isEdit} shipmentData={shipmentData}>
				<AdditionalServiceList />
			</AccordianView>
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
