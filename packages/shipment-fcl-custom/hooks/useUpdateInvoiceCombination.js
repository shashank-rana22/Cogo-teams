import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

import POST_REVIEWED_INVOICES from '../common/SalesInvoice/helpers/post-reviewed-sales-invoices';
import IsAllServicesTaken from '../helpers/IsAllServicesTaken';

const useUpdateInvoiceCombination = ({
	refetch = () => {},
	successMessage = 'Invoice Preference edited!',
	servicesList,
	selectedParties,
	allServiceLineitemsCount,
	importer_exporter_id,
}) => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/update_shipment_invoice_combination',
		method : 'POST',
	}, { manual: true });

	const handleEditPreferences = async () => {
		try {
			const { isAllMainServicesTaken } = IsAllServicesTaken(
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

			const finalParties = [];

			filteredParties.forEach((party) => {
				const partyServices = [];
				party?.services?.map((item) => {
					const { display_name, trade_type, serviceKey, is_igst, ...rest } = item;
					const partyService = {
						...rest,
					};
					partyServices.push(partyService);
					return partyServices;
				});
				const partyDetails = {
					...party,
					services: partyServices,
				};

				if (
					!POST_REVIEWED_INVOICES.includes(partyDetails?.status)
					&& partyDetails?.services?.length
				) {
					if (typeof partyDetails.id === 'number') {
						delete partyDetails.id;
					}
					finalParties.push(partyDetails);
				}
			});

			await trigger({
				data: {
					shipment_id          : shipment_data.id,
					invoice_combinations : finalParties,
					performed_by_org_id  : importer_exporter_id,
				},
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err?.data);
		}
	};

	return { handleEditPreferences, loading, data };
};

export default useUpdateInvoiceCombination;
