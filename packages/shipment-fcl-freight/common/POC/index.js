import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListShipmentTradePartners from '../../hooks/useListShipmentTradePartners';
// import usePocServiceList from '../../hooks/usePocServiceList';

import AddCompanyModal from './components/AddCompanyModal';
import AddedTradeParty from './components/AddedTradeParty';
import AddPocModal from './components/AddPocModal';
import InvoicingParty from './components/InvoicingParty';
import NotifyingParty from './components/NotifyingParty';
import POCS from './components/POCS';
// import ServiceProvider from './components/ServiceProvider';
// import TradeParties from './components/TradeParties';
// import getServiceProviderData from './helpers/getServiceProviderData';
import styles from './styles.module.css';

function POC({ shipment_data = {} }) {
	const { id:shipment_id, importer_exporter_id, services } = shipment_data || {};

	const [addCompany, setAddCompany] = useState(null);
	const [addPoc, setAddPoc] = useState(null);

	const {
		data,
		apiTrigger:tradePartnerTrigger,
		loading,
	} = useListShipmentTradePartners({ shipment_id });

	// const { data:servicesData } = usePocServiceList({
	// 	shipment_id,
	// 	defaultFilters : { status: ['active', 'pending', 'inactive'] },
	// 	defaultParams  : {
	// 		service_stakeholder_required   : true,
	// 		collection_party_data_required : true,
	// 	},
	// });

	// const serviceProviders = getServiceProviderData(servicesData);

	return (
		<div>
			{loading
				? <div className={styles.loader}><Loader /></div>

				: (
					<div className={styles.container}>
						{/* <TradeParties
							tradePartnersData={data}
							setAddCompany={setAddCompany}
							serviceProviders={serviceProviders}
						/> */}

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

						<NotifyingParty
							tradePartnersData={data}
							shipment_id={shipment_id}
							tradePartnerTrigger={tradePartnerTrigger}
						/>

						<InvoicingParty
							tradePartnersData={data}
						/>
						{/* <ServiceProvider
							tradePartnersData={data}
							setAddPoc={setAddPoc}
							serviceProviders={serviceProviders}
						/> */}

						{!isEmpty(addCompany) && (
							<AddCompanyModal
								tradePartnersData={data}
								addCompany={addCompany}
								setAddCompany={setAddCompany}
								tradePartnerTrigger={tradePartnerTrigger}
								shipment_id={shipment_id}
								importer_exporter_id={importer_exporter_id}
							/>
						)}

						{!isEmpty(addPoc) && (
							<AddPocModal
								setAddPoc={setAddPoc}
								addPoc={addPoc}
								tradePartnerTrigger={tradePartnerTrigger}
								importer_exporter_id={importer_exporter_id}
								shipment_id={shipment_id}
								services={services}
							/>
						)}
					</div>
				)}
		</div>
	);
}
export default POC;
