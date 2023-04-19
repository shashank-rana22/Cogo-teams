import useGetTicketStats from '../hooks/useGetTicketStats';
import useListTickets from '../hooks/useListTickets';
import getActiveCardDetails from '../utils/getActiveCardDetails';

const useGetTicketsData = ({
	activeMessageCard = {},
	activeVoiceCard = {},
	activeTab = '',
	setRaiseTicketModal = () => {},
}) => {
	const formattedMessageData = getActiveCardDetails(activeMessageCard) || {};
	const {
		user_id = '',
		lead_user_id = '',
	} = formattedMessageData || {};

	const {
		user_data = {},
	} = activeVoiceCard || {};

	const DATA_MAPPING = {
		voice: {
			userId     : user_data?.id,
			leadUserId : null,
		},
		message: {
			userId     : user_id,
			leadUserId : lead_user_id,
		},
	};
	const { userId, leadUserId } = DATA_MAPPING[activeTab] || {};

	const {
		ticketData = {},
		listLoading,
		fetchTickets = () => {},
		setFilter = () => {},
		filter = '',
	} = useListTickets({ UserID: userId || leadUserId, activeTab });

	const {
		statsData = {},
		statsLoading = false,
		fetchTicketsStats = () => {},
	} = useGetTicketStats({ UserID: userId || leadUserId, activeTab });

	const refetchTickets = () => {
		fetchTicketsStats();
		fetchTickets();
	};

	const createTicket = () => {
		setRaiseTicketModal({
			state: true, data: { formattedData: { user_id: userId, lead_user_id: leadUserId }, source: 'tickets' },
		});
	};
	const zippedTicketsData = {
		statsLoading,
		ticketData,
		listLoading,
		statsData,
		createTicket,
		setFilter,
		filter,
	};

	return {
		zippedTicketsData, refetchTickets,
	};
};
export default useGetTicketsData;
