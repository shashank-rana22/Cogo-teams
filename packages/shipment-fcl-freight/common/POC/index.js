import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListShipmentTradePartners from '../../hooks/useListShipmentTradePartners';
import usePocServiceList from '../../hooks/usePocServiceList';

import AddCompanyModal from './components/AddCompanyModal';
import AddedTradeParty from './components/AddedTradeParty';
import AddPocModal from './components/AddPocModal';
import InvoicingParty from './components/InvoicingParty';
import NotifyingParty from './components/NotifyingParty';
import POCS from './components/POCS';
import ServiceProvider from './components/ServiceProvider';
import TradeParties from './components/TradeParties';
import getServiceProviderData from './helpers/getServiceProviderData';
import styles from './styles.module.css';

function POC() {
	const importer_exporter_id = '8b46fcc0-085b-4b18-9302-52655f698ce5';
	const shipment_id = 'e50be905-5fd1-460b-82e5-548ece312be7';

	const [addCompany, setAddCompany] = useState(null);
	const [addPoc, setAddPoc] = useState(null);

	const {
		data,
		apiTrigger:tradePartnerTrigger,
	} = useListShipmentTradePartners({ shipment_id });

	const { data:servicesData } = usePocServiceList({
		shipment_id,
		defaultFilters : { status: ['active', 'pending', 'inactive'] },
		defaultParams  : {
			service_stakeholder_required   : true,
			collection_party_data_required : true,
		},
	});

	const serviceProviders = getServiceProviderData(servicesData);

	return (
		<div className={styles.container}>
			<TradeParties
				tradePartnersData={data}
				setAddCompany={setAddCompany}
				serviceProviders={serviceProviders}
			/>

			<POCS
				tradePartnersData={data}
				setAddPoc={setAddPoc}
				shipment_id={shipment_id}
			/>

			<AddedTradeParty
				tradePartnersData={data}
				setAddCompany={setAddCompany}
				setAddPoc={setAddPoc}
			/>

			<ServiceProvider
				tradePartnersData={data}
				setAddPoc={setAddPoc}
				serviceProviders={serviceProviders}
			/>

			<NotifyingParty
				tradePartnersData={data}
			/>

			<InvoicingParty
				tradePartnersData={data}
			/>

			{!isEmpty(addCompany)
			&& (
				<AddCompanyModal
					tradePartnersData={data}
					addCompany={addCompany}
					setAddCompany={setAddCompany}
					tradePartnerTrigger={tradePartnerTrigger}
					shipment_id={shipment_id}
				/>
			)}

			{!isEmpty(addPoc) && (
				<AddPocModal
					setAddPoc={setAddPoc}
					addPoc={addPoc}
					tradePartnerTrigger={tradePartnerTrigger}
					importer_exporter_id={importer_exporter_id}
					shipment_id={shipment_id}
				/>
			)}

		</div>
	);
}
export default POC;
