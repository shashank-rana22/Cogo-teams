// eslint-disable-next-line import/no-cycle
import FormComponent from './FormComponent';
import Header from './Header';

function VendorDetails({ activeStepper = {}, setActiveStepper = () => {} }) {
	return (
		<div>
			<Header />
			<FormComponent activeStepper={activeStepper} setActiveStepper={setActiveStepper} />
		</div>
	);
}

export default VendorDetails;
