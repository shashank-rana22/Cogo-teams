import useGetMailContent from '../../../../../../hooks/useGetMailContent';
import { LoadPrevMessages } from '../MessagesThread';
import { ReceiveDivComponent, SentDivComponent } from '../MessagesThread/conversationDivMappings';
import NewUserOutBound from '../MessagesThread/NewUserOutBound';

const CONVERSATION_TYPE_MAPPING = {
	sent     : ReceiveDivComponent,
	received : SentDivComponent,
};

const MESSAGE_CONVERSATION_TYPES = ['sent', 'received'];

function MailsThread(
	{
		loadingPrevMessages = false,
		lastPage = false,
		getNextData = () => {},
		messagesData = [],
		activeMessageCard = {},
		formattedData = {},
		setRaiseTicketModal = () => {},
		hasNoFireBaseRoom = false,
		setModalType = () => {},
		activeTab = {},
		firestore = {},
		viewType = '',
		hasPermissionToEdit = false,
		mailProps = {},
		deleteMessage = () => {},
		roomId = '',
	},
) {
	const {
		user_name = '',
	} = activeMessageCard;

	const updatedArray = [...(messagesData || [])].reverse();

	const isTheFirstMessageId = updatedArray?.find(
		(item) => MESSAGE_CONVERSATION_TYPES.includes(item?.conversation_type),
	);

	const mailContentProps = useGetMailContent({ firestore, formattedData });

	if (hasNoFireBaseRoom) {
		return (
			<NewUserOutBound
				setModalType={setModalType}
				activeTab={activeTab}
			/>
		);
	}

	return (
		<>
			{(updatedArray || [])?.map((eachMessage) => {
				const Component = CONVERSATION_TYPE_MAPPING[eachMessage?.conversation_type] || null;

				if (!Component) {
					return null;
				}

				return (
					<Component
						key={eachMessage?.created_at}
						conversation_type={eachMessage?.conversation_type || 'unknown'}
						eachMessage={eachMessage}
						activeMessageCard={activeMessageCard}
						user_name={user_name}
						setRaiseTicketModal={setRaiseTicketModal}
						formattedData={formattedData}
						viewType={viewType}
						hasPermissionToEdit={hasPermissionToEdit}
						mailProps={mailProps}
						deleteMessage={deleteMessage}
						firestore={firestore}
						isTheFirstMessageId={isTheFirstMessageId?.id}
						roomId={roomId}
						{...(mailContentProps || {})}
					/>
				);
			})}
			<LoadPrevMessages
				loadingPrevMessages={loadingPrevMessages}
				lastPage={lastPage}
				getNextData={getNextData}
			/>
		</>
	);
}

export default MailsThread;
