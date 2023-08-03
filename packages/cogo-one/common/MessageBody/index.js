import { MESSAGE_TYPE_WISE_MAPPING } from './messageBodyMapping';

function MessageBody({
	response = {},
	message_type = 'text',
	eachMessage = {},
	formattedData = {},
}) {
	const { message = '', media_url = '', profanity_check = '' } = response;

	const hasProfanity = profanity_check === 'nudity';

	const fileExtension = media_url?.split('.').pop();

	const Component = MESSAGE_TYPE_WISE_MAPPING[message_type] || MESSAGE_TYPE_WISE_MAPPING.default;

	return (
		<Component
			key={message_type}
			message={message}
			mediaUrl={media_url}
			hasProfanity={hasProfanity}
			fileExtension={fileExtension}
			messageType={message_type}
			eachMessage={eachMessage}
			formattedData={formattedData}
			response={response}
		/>
	);
}

export default MessageBody;
