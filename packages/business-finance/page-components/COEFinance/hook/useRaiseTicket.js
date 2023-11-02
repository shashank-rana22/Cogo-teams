import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRaiseTicket = ({
	updateBillsTicketId = () => {},
	setShowTicketModal = () => {},
	source = '',
	shipmentData = {},
	service = {},
}) => {
	const { profile } = useSelector((state) => state);
	const [{ loading = false }, trigger] = useTicketsRequest({
		url     : '/ticket',
		method  : 'post',
		authkey : 'post_tickets_ticket',
	}, { manual: true });

	const raiseTickets = async (val) => {
		const {
			issue_type,
			supporting_document,
			describe_issue,
			raised_to_desk,
			raised_to,
		} = val || {};
		const { finalUrl = '' } = supporting_document || {};

		const {
			serial_id = '',
			trade_type = '',
			shipment_type = '',
		} = shipmentData || {};

		try {
			const response = await trigger({
				data: {
					UserID           : profile?.user?.id || undefined,
					PerformedByID    : profile?.user?.id || undefined,
					Source           : 'admin',
					UserType         : 'ticket_user',
					Description      : describe_issue,
					Type             : issue_type || undefined,
					TicketReviewerID : raised_to,
					RaisedByDesk     : 'Auditor',
					RaisedToDesk     : raised_to_desk || undefined,
					CategoryDeskType : 'by_desk',
					Data             : {
						Attachment  : [finalUrl] || [],
						RequestType : 'shipment',
						SerialID    : serial_id || undefined,
						TradeType   : trade_type || undefined,
						Service     : source === 'audit_function' ? service?.value : shipment_type,
					},
				},
			});
			if (source === 'cost_advocate') {
				updateBillsTicketId(response);
			}
			if (source === 'audit_function') {
				setShowTicketModal(false);
			}

			Toast.success('Successfully Created');
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return {
		raiseTickets,
		loading,
	};
};

export default useRaiseTicket;
