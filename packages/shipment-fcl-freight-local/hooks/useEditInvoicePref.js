import getGeoConstants from '@cogoport/globalization/constants/geo';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import formatIps from '../common/SalesInvoice/helpers/format-ips';

import useUpdateInvoiceCombination from './useUpdateInvoiceCombination';

const geo = getGeoConstants();

const useEditInvoicePref = ({
	shipment_data = {},
	servicesList = [],
	invoicing_parties = [],
	refetch = () => {},
}) => {
	const { importer_exporter_id = '' } = shipment_data;
	const allServiceLineitems = [];
	invoicing_parties?.forEach((p) => {
		const { invoice_currency } = p || {};
		const allServices = (p?.services || []).map((service) => ({
			...service,
			invoice_currency,
		}));
		allServiceLineitems.push(...allServices);
	});

	const formattedIps = formatIps(invoicing_parties || []);
	const initial_service_invoice_id = {};
	formattedIps?.forEach((ip) => {
		ip?.services?.forEach((service) => {
			initial_service_invoice_id[service?.serviceKey] = ip?.id;
		});
	});

	const [selectedParties, setSelectedParties] = useState(formattedIps || []);

	const handleInvoicingPartyAdd = (ba) => {
		const {
			trade_party_type,
			tax_number,
			organization_trade_party_id,
			registration_number,
			poc,
			pincode,
			organization_id,
			organization_country_id,
			name,
			is_sez,
			business_name,
			address,
			tax_mechanism,
		} = ba || {};

		const newParty = {
			id              : selectedParties.length,
			billing_address : {
				trade_party_type,
				tax_number,
				organization_trade_party_id,
				registration_number,
				poc,
				pincode,
				organization_id,
				organization_country_id,
				name,
				is_sez,
				business_name,
				address,
				tax_mechanism,
			},
			invoice_currency : geo.country.currency.code,
			services         : [],
			is_active        : true,
			invoice_source   : '',
		};
		setSelectedParties([newParty, ...selectedParties]);
	};

	const handleServiceChange = (inv, { service_ids: newServices, invoice_currency: new_ic }) => {
		const currentInvoiceIndex = selectedParties?.findIndex(
			(party) => party.id === inv.id,
		);

		if (currentInvoiceIndex >= 0) {
			const newSelectParties = [];
			selectedParties.forEach((party) => {
				const updateParty = { ...party };
				updateParty.services = (party.services || []).filter(
					(serviceItem) => !newServices.includes(serviceItem?.serviceKey),
				);
				newSelectParties.push(updateParty);
			});

			newSelectParties[currentInvoiceIndex].services = newServices?.map(
				(service) => {
					const itemsService = allServiceLineitems.find(
						(item) => item.serviceKey === service,
					);

					const currentService = invoicing_parties?.services?.find(
						(serv) => serv?.id === service?.split(':')?.[0],
					);

					let serviceType = currentService?.service_type;
					if (isEmpty(currentService?.service_type)) {
						serviceType = itemsService?.service_type;
					}

					return {
						serviceKey   : service,
						is_igst      : itemsService?.is_igst || null,
						service_type : serviceType,
						service_id   : currentService?.id || itemsService?.service_id,
						trade_type   : currentService?.trade_type || itemsService?.trade_type,
						display_name:
							itemsService?.service_type === 'shipment'
								? 'Convenience Fees'
								: itemsService?.display_name,
					};
				},
			);
			newSelectParties[currentInvoiceIndex].invoice_currency = new_ic;

			let finalNewSelectParties = [...newSelectParties];
			if (finalNewSelectParties?.length > 1) {
				finalNewSelectParties = (newSelectParties || []).filter(
					(party) => !isEmpty(party?.services),
				);
			}
		}
	};

	const { handleEditPreferences, loading } = useUpdateInvoiceCombination({
		servicesList,
		selectedParties,
		initial_service_invoice_id,
		allServiceLineitemsCount: allServiceLineitems.length,
		refetch,
		importer_exporter_id,
	});

	return {
		selectedParties,
		setSelectedParties,
		handleInvoicingPartyAdd,
		handleServiceChange,
		handleEditPreferences,
		loading,
		formattedIps,
	};
};

export default useEditInvoicePref;
