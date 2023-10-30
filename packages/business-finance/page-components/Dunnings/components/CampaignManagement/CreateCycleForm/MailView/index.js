import MailTemplate from '../MailTemplate';

function MailView({ formData, setFormData }) {
	return (
		<div>

			<MailTemplate
				formData={formData}
				setFormData={setFormData}
			/>
		</div>
	);
}

export default MailView;
