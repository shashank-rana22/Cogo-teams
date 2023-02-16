import FormComponent from './FormComponent';
import Header from './Header';

function PaymentDetails({ activeStepper = {}, setActiveStepper = () => {} }) {
	return (
		<div>
			<Header />
			<FormComponent activeStepper={activeStepper} setActiveStepper={setActiveStepper} />
		</div>
	);
}

export default PaymentDetails;
