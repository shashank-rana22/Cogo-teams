import { Loader } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useListStakeholders from '../../hooks/useListShipmentStakeholders';
import useListShipmentTradePartners from '../../hooks/useListShipmentTradePartners';

import AddCompanyModal from './components/AddCompanyModal';
import AddedTradeParty from './components/AddedTradeParty';
import AddPocModal from './components/AddPocModal';
import InvoicingParty from './components/InvoicingParty';
import NotifyingParty from './components/NotifyingParty';
import Pocs from './components/Pocs';
import ServiceProvider from './components/ServiceProvider';
import TradeParties from './components/TradeParties';
import getServiceProviderData from './helpers/getServiceProviderData';
import styles from './styles.module.css';

function Poc({ shipment_data = {}, servicesList = [], activeStakeholder = '' }) {
	const { id:shipment_id, importer_exporter_id, services } = shipment_data || {};

	const [addCompany, setAddCompany] = useState(null);
	const [addPoc, setAddPoc] = useState(null);

	const {
		data,
		apiTrigger:tradePartnerTrigger,
		loading,
	} = useListShipmentTradePartners({ shipment_id });

	const {
		data:{ list:shipmentStakeholderData = [] } = {}, loading:stakeHolderLoading,
		apiTrigger:stakeholdersTrigger,
	} = useListStakeholders({
		shipment_id,
	});

	const serviceProviders = getServiceProviderData(servicesList);

	return (
		<div>
			{loading
				? (
					<div className={styles.loader}>
						<Loader />
					</div>
				)

				: (
					<div className={styles.container}>
						<TradeParties
							tradePartnersData={data}
							setAddCompany={setAddCompany}
							serviceProviders={serviceProviders}
							activeStakeholder={activeStakeholder}
						/>

						<Pocs
							tradePartnersData={data}
							setAddPoc={setAddPoc}
							shipmentStakeholderData={shipmentStakeholderData}
							stakeHolderLoading={stakeHolderLoading}
							servicesList={servicesList}
							shipment_data={shipment_data}
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
						<ServiceProvider
							tradePartnersData={data}
							setAddPoc={setAddPoc}
							serviceProviders={serviceProviders}
						/>

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
								stakeholdersTrigger={stakeholdersTrigger}
								servicesList={servicesList}
							/>
						)}
					</div>
				)}
		</div>
	);
}
export default Poc;
