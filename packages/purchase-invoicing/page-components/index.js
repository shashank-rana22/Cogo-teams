import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetCollectionParty from '../hooks/useGetCollectionPartylist';
import useGetShipmentCrossEntityInvoice from '../hooks/useGetShipmentCrossEntityInvoice';

import CollectionPartyDetails from './CollectionPartyDetails';
import Loader from './CollectionPartyDetails/Loader';
import Invoices from './Invoices';

function PurchaseInvoicing({
	shipmentData = {},
	servicesData = [],
	AddService = () => {},
	setCollectionPartyData = () => {},
}) {
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
		refetch:purchaseInvoicesRefetch,
	} = useGetShipmentCrossEntityInvoice({ shipment_id: shipmentData?.id });

	useEffect(() => {
		if (!collectionPartyLoading) {
			setCollectionPartyData(collectionPartyList);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectionPartyLoading, JSON.stringify(collectionPartyList), setCollectionPartyData]);

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

			{!loadingCE && !isEmpty(invoiceDataCE) && shipmentData?.shipment_type === 'fcl_freight' ? (
				<Invoices
					invoiceDataCE={invoiceDataCE}
					groupedInvoicesCE={groupedInvoicesCE}
					loadingCE={loadingCE}
					shipmentData={shipmentData}
					purchaseInvoicesRefetch={purchaseInvoicesRefetch}
				/>
			) : null}
		</div>
	);
}

export default PurchaseInvoicing;
