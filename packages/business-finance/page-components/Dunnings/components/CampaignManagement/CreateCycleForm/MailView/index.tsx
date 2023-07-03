import MailTemplate from '../MailTemplate';

interface Props {
	formData?: object;
	setFormData?: (p: object)=>void;
}

function MailView({ formData, setFormData }:Props) {
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
