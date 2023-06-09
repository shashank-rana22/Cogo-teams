import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

import POST_REVIEWED_INVOICES from '../common/SalesInvoice/helpers/post-reviewed-sales-invoices';

import useIsAllServicesTaken from './useIsAllServicesTaken';

const FINAL_PARTIES = [];
const PARTY_SERVICES = [];

const useUpdateInvoiceCombination = ({
	refetch = () => {},
	successMessage = 'Invoice Preference edited!',
	servicesList = [],
	selectedParties = [],
	allServiceLineitemsCount = 0,
	importer_exporter_id = '',
}) => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_shipment_invoice_combination',
		method : 'POST',
	}, { manual: true });

	const handleEditPreferences = async () => {
		try {
			const { isAllMainServicesTaken } = useIsAllServicesTaken(
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
					const { display_name, trade_type, serviceKey, ...rest } = item;
					const partyService = { ...rest };

					PARTY_SERVICES.push(partyService);
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
					}
					FINAL_PARTIES.push(partyDetails);
				}
			});

			await trigger({
				data: {
					shipment_id          : shipment_data?.id,
					invoice_combinations : FINAL_PARTIES,
					performed_by_org_id  : importer_exporter_id,
				},
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return { handleEditPreferences, loading, data };
};

export default useUpdateInvoiceCombination;
