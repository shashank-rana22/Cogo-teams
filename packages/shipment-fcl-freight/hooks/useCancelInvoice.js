import { Toast } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useCancelInvoice = () => {
	const [
		loading,
		trigger,
	] = useRequestBf(
		{
			url     : '/incident-management/incident',
			method  : 'post',
			authKey : 'post_incident_management_incident',
		},
		{ manual: true },
	);

	const { user_id } = useSelector(({ profile }) => ({
		user_id: profile?.user?.id,
	}));

	const geo = getGeoConstants();

	const entity_id = geo.others.navigations.partner.bookings.invoicing
		.request_cancel_invoice
		? geo.parent_entity_id
		: undefined;

	const submit = async ({
		cancelReason = '', proformaNumber = '', closeModal = () => {},
		invoiceId = '', invoiceCombinationId = '', refetch = () => {}, documentUrls = '',
	}) => {
		try {
			await trigger({
				data: {
					type            : 'REVOKE_INVOICE',
					incidentSubType : 'CANCEL_INVOICE',
					data            : {
						revokeInvoiceRequest: {
							invoiceNumber        : proformaNumber || undefined,
							documentUrls         : documentUrls || undefined,
							cancelReason         : cancelReason || undefined,
							invoiceCombinationId : invoiceCombinationId || undefined,
							invoiceId            : invoiceId || undefined,
							revokedBy            : user_id,
						},
					},
					source    : 'BOOKINGS',
					createdBy : user_id,
					entityId  : entity_id,
				},
			});
			Toast.success('Requested Cancel E invoice');
			closeModal();
			refetch();
		} catch (error) {
			Toast.error('There was an error Cancelling E-Invoice');
		}
	};

	return {
		loading,
		submit,
	};
};

export default useCancelInvoice;
