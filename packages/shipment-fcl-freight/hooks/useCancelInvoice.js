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
			authKey : 'create_cancel_e_invoice_incident',
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

	const submit = async ({ values, proformaNumber, closeModal, invoiceId, invoiceCombinationId, refetch }) => {
		try {
			const response = await trigger({
				data: {
					type : 'REVOKE_INVOICE',
					data : {
						revokeInvoiceRequest: {
							invoiceNumber : proformaNumber,
							documentUrls  : [values?.documentUrls?.finalUrl],
							cancelReason  : values?.cancelReason,
							invoiceCombinationId,
							invoiceId,
							revokedBy     : user_id,
						},
					},
					source    : 'BOOKINGS',
					createdBy : user_id,
					entityId  : entity_id,
				},
			});
			const {
				data: { message },
			} = response;
			Toast.success(message);
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
