import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import formatIps from '../page-components/SalesInvoice/helpers/format-ips';

import useUpdateInvoiceCombination from './useUpdateInvoiceCombination';

const EXPORT_SERVICES_TYPES = 'air_freight_service';

const INVOICE_INDEX_GREATER_THAN = 0;

const UNIQ_IGST_VAL_LENGTH = 1;

const UNIQ_IGST_COUNT = 2;

const PARTY_SERVICES_LENGTH_GREATER_THAN = 1;

const useEditInvoicePref = ({
	shipment_data = {},
	servicesList,
	invoicing_parties = [],
	refetch = () => {},
}) => {
	const geo = getGeoConstants();

	const { inco_term = '', importer_exporter_id = '' } = shipment_data;
	const updateExportInvoices = getTradeTypeByIncoTerm(inco_term) === 'export';
	const ALL_SERVICE_LINE_ITEMS = [];
	invoicing_parties?.forEach((p) => {
		const { invoice_currency, is_igst } = p || {};
		const allServices = (p?.services || []).map((service) => ({
			...service,
			invoice_currency,
			is_igst,
		}));
		ALL_SERVICE_LINE_ITEMS.push(...allServices);
	});

	const formattedIps = formatIps(invoicing_parties || []);
	const INITIAL_SERVICE_INVOICE_ID = {};
	formattedIps?.forEach((ip) => {
		ip?.services?.forEach((service) => {
			INITIAL_SERVICE_INVOICE_ID[service?.serviceKey] = ip?.id;
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

		const currentInvoiceId = selectedParties?.find(
			(party) => party.id === inv.id,
		)?.id;

		if (currentInvoiceIndex >= INVOICE_INDEX_GREATER_THAN) {
			const 	NEW_SELECT_PARTIES = [];
			selectedParties.forEach((party) => {
				const updateParty = { ...party };
				updateParty.services = (party.services || []).filter(
					(serviceItem) => !newServices.includes(serviceItem?.serviceKey),
				);
				NEW_SELECT_PARTIES.push(updateParty);
			});

			let isBasicFreightInvService = {};
			NEW_SELECT_PARTIES[currentInvoiceIndex].services = newServices?.map(
				(service) => {
					const itemsService = ALL_SERVICE_LINE_ITEMS.find(
						(item) => item.serviceKey === service,
					);

					const isBasicFreight = (itemsService?.line_items || []).find(
						(item) => item?.code === 'BAS',
					);

					if (!isEmpty(isBasicFreight)) {
						isBasicFreightInvService = itemsService;
					}

					const currentService = invoicing_parties?.services?.find(
						(serv) => serv?.id === service?.split(':')?.[GLOBAL_CONSTANTS.zeroth_index],
					);

					let serviceType = currentService?.service_type;
					if (currentService?.service_type === 'trailer_freight_service') {
						serviceType = 'haulage_freight_service';
					}
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
			NEW_SELECT_PARTIES[currentInvoiceIndex].invoice_currency = new_ic;

			let finalNewSelectParties = [...NEW_SELECT_PARTIES];
			if (finalNewSelectParties?.length > PARTY_SERVICES_LENGTH_GREATER_THAN) {
				finalNewSelectParties = (NEW_SELECT_PARTIES || []).filter(
					(party) => !isEmpty(party?.services),
				);
			}

			const changedIP = finalNewSelectParties?.find(
				(item) => item?.id === currentInvoiceId,
			);

			const igstArray = (changedIP?.services || []).map(
				(service) => service?.is_igst,
			);
			const uniq_igst_val = igstArray || [];
			const allowServiceMerge = uniq_igst_val?.length === UNIQ_IGST_VAL_LENGTH;

			let isBasicFreight = false;
			if (!isEmpty(isBasicFreightInvService)) {
				(finalNewSelectParties || []).forEach((party) => {
					const BFLineItem = (party?.services || []).some(
						(service) => service.serviceKey === isBasicFreightInvService.serviceKey
							&& EXPORT_SERVICES_TYPES === isBasicFreightInvService.service_type,
					);

					const isSubsidiary = (party?.services || []).some(
						(service) => service.service_type === 'subsidiary_service',
					);

					if (party?.services?.length > PARTY_SERVICES_LENGTH_GREATER_THAN && BFLineItem) {
						isBasicFreight = !isSubsidiary;
					}
				});
			}

			const uniq_igst_count = uniq_igst_val.filter(Boolean).length;

			if (uniq_igst_count >= UNIQ_IGST_COUNT) {
				setSelectedParties([...finalNewSelectParties]);
			} else if (isBasicFreight && updateExportInvoices && !allowServiceMerge) {
				Toast.error(
					'Basic Freight or IGST invoices cannot be merged with other services',
				);
			} else {
				setSelectedParties([...finalNewSelectParties]);
			}
		}
	};

	const { handleEditPreferences, loading } = useUpdateInvoiceCombination({
		servicesList,
		selectedParties,
		initial_service_invoice_id : INITIAL_SERVICE_INVOICE_ID,
		allServiceLineitemsCount   : ALL_SERVICE_LINE_ITEMS.length,
		refetch,
		importer_exporter_id,
		updateExportInvoices,
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
