/* eslint-disable import/no-cycle */
import FormComponent from './FormComponent';
import Header from './Header';

function ContactDetails({ activeStepper = {}, setActiveStepper = () => {} }) {
	return (
		<div>
			<Header />
			<FormComponent
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
			/>
		</div>
	);
}

export default ContactDetails;
