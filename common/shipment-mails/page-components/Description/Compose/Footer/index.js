import React, { useState } from 'react';
import Button from '@cogoport/front/components/admin/Button';
import { IcMCross } from '@cogoport/icons-react';
import { useSelector } from '@cogo/store';
import { Container, Wrapper, Row, AttachementItem, Name } from './styles';
import Attachement from './Attachment';
import useSendEmail from '../../../hooks/useSendEmail';
import useForwardEmail from '../../../hooks/useForwardEmail';
import useReplyAllEmail from '../../../hooks/useReplyAllEmail';
import useReplyEmail from '../../../hooks/useReplyEmail';

const Footer = ({
	content,
	composingEmail = {},
	COMPOSE_EMAIL,
	handleSubmit,
	onError,
	action,
	onCreate,
}) => {
	const userId = useSelector(({ profile }) => profile?.id);
	const { createEmail, mailApi } = useSendEmail();
	const { forwardEmail, forwardMailApi } = useForwardEmail();
	const { replyAllEmail, replyAllMailApi } = useReplyAllEmail();
	const { replyEmail, replyMailApi } = useReplyEmail();
	const [attachments, setAttachements] = useState([]);
	let actionToPerform = createEmail;
	let buttonText = 'Send Mail';
	if (action === 'reply') {
		actionToPerform = replyEmail;
		buttonText = 'Reply Mail';
	}
	if (action === 'reply_all') {
		actionToPerform = replyAllEmail;
		buttonText = 'Reply To All';
	}
	if (action === 'forward') {
		actionToPerform = forwardEmail;
		buttonText = 'Forward';
	}

	const sendMail = async (data) => {
		const toUserEmail = data?.toUserEmail
			.split(',')
			.map((email) => email.trim());
		const payload = {
			sender: COMPOSE_EMAIL,
			toUserEmail,
			ccrecipients: [],
			subject: data?.subject,
			content,
			attachments: attachments.map((item) => item.url),
			msgId: composingEmail?.id || undefined,
			userId,
			onCreate,
		};
		await actionToPerform(payload);
	};
	const loading =
		replyAllMailApi.loading ||
		mailApi.loading ||
		forwardMailApi.loading ||
		replyMailApi.loading;
	return (
		<Wrapper>
			<Row>
				{attachments.map((attach) => (
					<AttachementItem>
						<Name>{attach.name} </Name>
						<IcMCross
							style={{ marginLeft: 4 }}
							onClick={() =>
								setAttachements([
									...attachments.filter(
										(newItem) => newItem.url !== attach.url,
									),
								])
							}
						/>
					</AttachementItem>
				))}
			</Row>
			<Container>
				<Attachement
					onChange={(value) => {
						if (value) {
							setAttachements([...attachments, value]);
						}
					}}
				/>
				<Button
					className="primary lg"
					onClick={handleSubmit(sendMail, onError)}
					disabled={loading}
				>
					{!loading ? buttonText : `${buttonText}...`}
				</Button>
			</Container>
		</Wrapper>
	);
};

export default Footer;
