import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import formatIps from '../common/SalesInvoice/helpers/format-ips';
import POST_REVIEWED_INVOICES from '../common/SalesInvoice/helpers/post-reviewed-sales-invoices';
import incoTermMapping from '../configurations/inco-term-mapping.json';

const geo = getGeoConstants();
const ALL_SERVICE_LINE_ITEMS = [];
const INITIAL_SERVICE_INVOICE_ID = {};
const TOTAL_CURRENT_INVOICE_INDEX = 0;
const TOTAL_LENGTH = 1;
const PARTY_SERVICES = [];
const FINAL_PARTIES = [];
const NOT_TAKEN = [];
const NEW_SELECTED_PARTIES = [];

const isAllServicesTaken = (
	servicesList,
	selectedParties,
	shipment_data,
	allServiceLineitemsCount,
) => {
	const shipmentMainService = `${shipment_data?.shipment_type}_service`;

	let allServicesTaken = [];
	selectedParties.forEach((party) => {
		allServicesTaken.push(...(party.services || []));
	});

	allServicesTaken = allServicesTaken.map((service) => service.service_id);

	let mainServices = [];
	if (shipment_data?.state === 'cancelled') {
		mainServices = servicesList?.filter(
			(service) => service?.service_type === shipmentMainService,
		);
	} else {
		mainServices = servicesList?.filter(
			(service) => service?.service_type !== 'subsidiary_service',
		);
	}

	let isAllMainServicesTaken = true;

	mainServices.forEach((service) => {
		if (!allServicesTaken.includes(service.id)) {
			isAllMainServicesTaken = false;
			NOT_TAKEN.push(service.service_type);
		}
	});

	if (allServicesTaken.length !== allServiceLineitemsCount) {
		isAllMainServicesTaken = false;
	}
	return { isAllMainServicesTaken, NOT_TAKEN };
};

const useEditInvoicePref = ({
	servicesList,
	invoicing_parties = [],
	shipment_data = {},
	refetch = () => {},
}) => {
	invoicing_parties?.forEach((p) => {
		const { invoice_currency, is_igst } = p || {};
		const allServices = (p?.services || []).map((service) => ({
			...service,
			invoice_currency,
			is_igst,
		}));
		ALL_SERVICE_LINE_ITEMS.push(...allServices);
	});

	const allServiceLineitemsCount = ALL_SERVICE_LINE_ITEMS.length;

	const formattedIps = formatIps(invoicing_parties || []);
	formattedIps?.forEach((ip) => {
		ip?.services?.forEach((service) => {
			INITIAL_SERVICE_INVOICE_ID[service?.serviceKey] = ip?.id;
		});
	});

	const [selectedParties, setSelectedParties] = useState(formattedIps || []);

	const {
		inco_term = '',
		importer_exporter_id,
	} = shipment_data;

	const updateExportInvoices = incoTermMapping[inco_term] === 'export';

	const endPoint = updateExportInvoices ? '/update_shipment_export_invoice_combination'
		: '/update_shipment_invoice_combination';

	const [{ loading }, trigger] = useRequest({
		url    : endPoint,
		method : 'POST',
	}, { manual: true });

	const handleInvoicingPartyAdd = (ba) => {
		const newParty = {
			id              : selectedParties.length,
			billing_address : {
				tax_number                  : ba?.tax_number,
				organization_trade_party_id : ba?.organization_trade_party_id,
				registration_number         : ba?.registration_number,
				poc                         : ba?.poc,
				pincode                     : ba?.pincode,
				organization_id             : ba?.organization_id,
				organization_country_id     : ba?.organization_country_id,
				name                        : ba?.name,
				is_sez                      : ba?.is_sez,
				tax_mechanism               : ba?.tax_mechanism,
				business_name               : ba?.business_name,
				address                     : ba?.address,
				trade_party_type            : ba?.trade_party_type,
			},
			invoice_currency : geo.country.currency.code,
			services         : [],
			is_active        : true,
			invoice_source   : '',
		};
		setSelectedParties([newParty, ...selectedParties]);
	};

	const handleServiceChange = (
		inv,
		{ service_ids: newServices, invoice_currency: new_ic },
	) => {
		const currentInvoiceIndex = selectedParties?.findIndex(
			(party) => party.id === inv.id,
		);

		const currentInvoiceId = selectedParties?.find(
			(party) => party.id === inv.id,
		)?.id;

		if (currentInvoiceIndex >= TOTAL_CURRENT_INVOICE_INDEX) {
			selectedParties.forEach((party) => {
				const updateParty = { ...party };
				updateParty.services = (party.services || []).filter(
					(serviceItem) => !newServices.includes(serviceItem?.serviceKey),
				);
				NEW_SELECTED_PARTIES.push(updateParty);
			});

			let isBasicFreightInvService = {};
			NEW_SELECTED_PARTIES[currentInvoiceIndex].services = newServices?.map(
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
						(serv) => serv?.id === service?.split(':')?.[TOTAL_CURRENT_INVOICE_INDEX],
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
			NEW_SELECTED_PARTIES[currentInvoiceIndex].invoice_currency = new_ic;

			let finalNewSelectParties = [...NEW_SELECTED_PARTIES];
			if (finalNewSelectParties?.length > TOTAL_LENGTH) {
				finalNewSelectParties = (NEW_SELECTED_PARTIES || []).filter(
					(party) => !isEmpty(party?.services),
				);
			}

			const changedIP = finalNewSelectParties?.find(
				(item) => item?.id === currentInvoiceId,
			);

			const igstArray = (changedIP?.services || []).map(
				(service) => service?.is_igst,
			);
			const uniq_igst_val = new Set(igstArray || []);
			const allowServiceMerge = uniq_igst_val?.length === TOTAL_LENGTH;

			let isBasicFreight = false;
			if (!isEmpty(isBasicFreightInvService)) {
				(finalNewSelectParties || []).forEach((party) => {
					const BFLineItem = (party?.services || []).some(
						(service) => service.serviceKey === isBasicFreightInvService.serviceKey,
					);

					if (party?.services?.length > TOTAL_LENGTH && BFLineItem) {
						isBasicFreight = true;
					}
				});
			}

			if (isBasicFreight && updateExportInvoices && !allowServiceMerge) {
				Toast.error(
					'Basic Freight or IGST invoices cannot be merged with other services',
				);
			} else {
				setSelectedParties([...finalNewSelectParties]);
			}
		}
	};

	const handleEditPreferences = async () => {
		try {
			const { isAllMainServicesTaken } = isAllServicesTaken(
				servicesList,
				selectedParties,
				shipment_data,
				allServiceLineitemsCount,
			);

			if (!isAllMainServicesTaken) {
				Toast.error('You have not added all taken services');
				return;
			}
			const filteredParties = selectedParties.filter(
				(party) => !!party.services.length || typeof party.id === 'string',
			);

			filteredParties.forEach((party) => {
				party?.services?.map((item) => {
					const xyz = {
						...item,
						invoice_combination_id: updateExportInvoices
							? INITIAL_SERVICE_INVOICE_ID[item?.serviceKey] || undefined
							: undefined,
						display_name : undefined,
						trade_type   : undefined,
						serviceKey   : undefined,
						is_igst      : null,
					};

					PARTY_SERVICES.push(xyz);
					return PARTY_SERVICES;
				});

				const partyDetails = {
					...party,
					services: PARTY_SERVICES,
				};

				if (
					!POST_REVIEWED_INVOICES.includes(partyDetails?.status)
					&& partyDetails?.services?.length
				) {
					if (typeof partyDetails.id === 'number') {
						delete partyDetails.id;
						FINAL_PARTIES.push(partyDetails);
					} else {
						FINAL_PARTIES.push(partyDetails);
					}
				}
			});

			const payload = {
				shipment_id          : shipment_data.id,
				invoice_combinations : FINAL_PARTIES,
				performed_by_org_id  : importer_exporter_id,
			};

			await trigger({
				data: payload,
			});
			Toast.success('Invoice Preference edited!');
			refetch();
		} catch (err) {
			toastApiError(err?.data);
		}
	};

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
