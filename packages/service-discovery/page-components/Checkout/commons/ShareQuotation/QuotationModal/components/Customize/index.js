import EmailComponent from './components/EmailComponent';
import MessageComponent from './components/MessageComponent';
import styles from './styles.module.css';

function Customize({
	detail,
	organization,
	selectedModes,
	widths = {},
	billing_addresses = [],
	setSelected,
	selected,
	emailContent,
	emailControl,
	emailErrors,
	handleNext = () => {},
}) {
	const { email, message } = widths;

	return (
		<div className={styles.container}>
			{selectedModes.includes('email') ? (
				<div className={styles.email_component} style={{ width: email }}>
					<EmailComponent
						detail={detail}
						organization={organization}
						billing_addresses={billing_addresses}
						setSelected={setSelected}
						selected={selected}
						emailContent={emailContent}
						emailControl={emailControl}
						handleNext={handleNext}
						emailErrors={emailErrors}
					/>
				</div>
			) : null}

			{selectedModes.some((item) => ['sms', 'whatsapp'].includes(item)) ? (
				<div className={styles.message_component} style={{ width: message }}>
					<MessageComponent />
				</div>
			) : null}
		</div>
	);
}

export default Customize;
