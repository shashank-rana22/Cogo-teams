import React from 'react';
import { IcMProfile, IcMAttach } from '@cogoport/icons-react';
import {
	formatDistanceToNow,
	subtractDays,
	addHours,
} from '@cogoport/front/date';
import addMinutes from 'date-fns/addMinutes';
import formatDate from '@cogo/globalization/utils/formatDate';
import GLOBAL_CONSTANTS from '@cogo/globalization/constants/globals.json';
import {
	Container,
	Circle,
	Sender,
	Content,
	Row,
	Subject,
	InitialBody,
} from './styles';

function EmailCard({ data, onClick }) {
	const yesterday = subtractDays(new Date(), 1);
	let received_time = addHours(data.received_time, 5);
	received_time = addMinutes(received_time, 30);
	const diaplayDate =
		new Date(received_time) > yesterday
			? formatDistanceToNow(received_time)
			: formatDate({
					date: received_time,
					dateFormat: GLOBAL_CONSTANTS.formats.date['eee, dd MMM, yyyy'],
					formatType: 'date',
			  });
	return (
		<Container onClick={() => onClick(data)}>
			<Circle>
				<IcMProfile />
			</Circle>
			<Content>
				<Row>
					<Sender>{data.sender}</Sender>
					{data?.attachments_attachment_id ? <IcMAttach /> : null}
				</Row>
				<Row>
					<Subject>{data.subject}</Subject>
					<Subject>{diaplayDate}.</Subject>
				</Row>
				<InitialBody>{data.body_preview}</InitialBody>
			</Content>
		</Container>
	);
}

export default EmailCard;
