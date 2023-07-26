import { Button, Pill } from '@cogoport/components';
import { IcMReply, IcMForward } from '@cogoport/icons-react';

import styles from './styles.module.css';

function MailsFlex({ mailsArray = [] }) {
	return (
		<div className={styles.mail_ids_flex}>
			{mailsArray.map((eachMail) => (
				<Pill
					key={eachMail}
					className={styles.each_mail}
					size="sm"
					color="#FEF3E9"
				>
					{eachMail}
				</Pill>
			))}
		</div>
	);
}
const BUTTON_MAPPING = [
	{ buttonName: 'Reply', icon: IcMReply },
	{ buttonName: 'Forward', icon: IcMForward },
];

function MailBody({ formattedData = {}, eachMessage = {} }) {
	const { response, send_by = '', conversation_type = '' } = eachMessage || {};
	const { user_name = '' } = formattedData || {};

	const {
		cc = ['malothu.lachiramnaik@cogoport.com'],
		bcc = ['sanmit.vartak@cogoport.com'],
		from = 'danampallyrahul1729@gmail.com',
		to = ['sanmit.vartak@cogoport.com', 'malothu.lachiramnaik@cogoport.com'],
		message = '',
		subject = 'sujec',
	} = response || {};

	const DATA_MAPPING = {
		sent: {
			name           : user_name,
			subscript      : 'From',
			subscriptArray : from,
		},
		received: {
			name           : send_by || 'agent',
			subscript      : 'To',
			subscriptArray : to,
		},
	};

	const { name, subscript, subscriptArray } = DATA_MAPPING[conversation_type] || DATA_MAPPING.received;

	const iterableSubscriptArray = [subscriptArray].flat();
	const MAIL_ARRAY_MAPPING = [
		{ text: subscript, mailsArray: iterableSubscriptArray },
		{ text: 'Cc', mailsArray: cc },
		{ text: 'Bcc', mailsArray: bcc },
	];

	return (
		<div className={styles.container}>
			<div className={styles.name}>{name}</div>
			{MAIL_ARRAY_MAPPING.map((item) => {
				const { text = '', mailsArray = [] } = item;
				return (
					<div className={styles.from_mail} key={text}>
						<span>
							{text}
							:
						</span>
						<MailsFlex mailsArray={mailsArray} />
					</div>
				);
			})}
			<div className={styles.subject}>{subject}</div>
			<div className={styles.body} dangerouslySetInnerHTML={{ __html: message }} />
			<div className={styles.buttons_flex}>
				{BUTTON_MAPPING.map((eachButton) => {
					const { buttonName, icon:Icon } = eachButton || {};
					return (
						<Button key={buttonName} themeType="secondary" size="sm" className={styles.styled_button}>
							<Icon className={styles.icon} />
							<div className={styles.button_text}>{buttonName}</div>
						</Button>
					);
				})}
			</div>
		</div>
	);
}
export default MailBody;
