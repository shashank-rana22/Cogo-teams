import useListShipmentTradePartners from '../../hooks/useListShipmentTradePartners';

import AddCompanyModal from './components/AddCompanyModal';
import AddedTradeParty from './components/AddedTradeParty';
import Filters from './components/Filters';
import InvoicingParty from './components/InvoicingParty';
import NotifyingParty from './components/NotifyingParty';
import POCS from './components/POCS';
import ServiceProvider from './components/ServiceProvider';
import TradeParties from './components/TradeParties';
// 6dce8912-7892-4ed3-9f1e-843726b55fab
// 89909e8a-f8fe-4d69-a9b5-eda9197dfb1a
// b6f47b92-ee87-44d1-862f-60efb0f72150
function POC() {
	const { data } = useListShipmentTradePartners({ shipment_id: '6dce8912-7892-4ed3-9f1e-843726b55fab' });

	return (
		<div style={{ overflow: 'scroll' }}>
			<Filters />
			{/* <AddCompanyModal show /> */}

			<TradeParties tradePartnersData={data} />

			<POCS tradePartnersData={data} />

			<AddedTradeParty tradePartnersData={data} />

			<ServiceProvider tradePartnersData={data} />

			<NotifyingParty tradePartnersData={data} />

			<InvoicingParty tradePartnersData={data} />
		</div>
	);
}
export default POC;
