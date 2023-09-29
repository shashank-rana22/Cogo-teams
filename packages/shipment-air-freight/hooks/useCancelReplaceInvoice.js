import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

const useCancelReplaceInvoice = () => {
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

	const onRevoke = async ({
		cancelReason = '', proformaNumber = '', closeModal = () => {},
		invoiceId = '', invoiceCombinationId = '', refetch = () => {}, documentUrls = '',
		incidentSubType = 'CANCEL_INVOICE', entityId = '',
	}) => {
		try {
			await trigger({
				data: {
					type : 'REVOKE_INVOICE',
					incidentSubType,
					data : {
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
					entityId,
				},
			});
			Toast.success(`Requested ${startCase(incidentSubType.toLowerCase())}`);
			closeModal();
			refetch();
		} catch (error) {
			Toast.error(`There was an error ${startCase(incidentSubType.toLowerCase())}`);
		}
	};

	return {
		loading,
		onRevoke,
	};
};

export default useCancelReplaceInvoice;
