import MailBody from '../../../../../../common/MailBody';
import ReceiveDiv from '../../../../../../common/ReceiveDiv';
import SentDiv from '../../../../../../common/SentDiv';

const RECEIVE_DIV_MAPPING = {
	whatsapp : ReceiveDiv,
	email    : MailBody,
	default  : ReceiveDiv,
};

const SENT_DIV_MAPPING = {
	whatsapp : SentDiv,
	email    : MailBody,
	default  : SentDiv,
};

export function ReceiveDivComponent(props) {
	const { formattedData } = props;
	const { channel_type = '' } = formattedData || {};

	const Comp = RECEIVE_DIV_MAPPING[channel_type] || RECEIVE_DIV_MAPPING.default;

	return <Comp {...props} key={channel_type} />;
}

export function SentDivComponent(props) {
	const { formattedData } = props;
	const { channel_type = '' } = formattedData || {};

	const Comp = SENT_DIV_MAPPING[channel_type] || SENT_DIV_MAPPING.default;

	return <Comp {...props} key={channel_type} />;
}
