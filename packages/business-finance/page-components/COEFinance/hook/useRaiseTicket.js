import { Toast } from '@cogoport/components';
import { useTicketsRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useRaiseTicket = ({
	shipmentData = {},
	updateBillsTicketId = () => {},
}) => {
	const { profile } = useSelector((state) => state);
	const [{ loading }, trigger] = useTicketsRequest({
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
		} = val || {};
		const { finalUrl = '' } = supporting_document || {};

		const {
			serial_id,
			trade_type,
			shipment_type,
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
					RaisedByDesk     : 'Auditor' || undefined,
					RaisedToDesk     : raised_to_desk || undefined,
					CategoryDeskType : 'by_desk',
					Data             : {
						Attachment  : [finalUrl] || [],
						RequestType : 'shipment' || undefined,
						SerialID    : serial_id || undefined,
						TradeType   : trade_type || undefined,
						Service     : shipment_type || undefined,
					},
				},
			});

			Toast.success('Successfully Created');

			updateBillsTicketId(response);
		} catch (error) {
			Toast.error(error?.response?.data);
		}
	};

	return { raiseTickets, loading };
};

export default useRaiseTicket;
