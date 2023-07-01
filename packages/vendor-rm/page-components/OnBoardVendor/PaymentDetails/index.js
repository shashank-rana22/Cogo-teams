import FormComponent from './FormComponent';
import Header from './Header';

function PaymentDetails({
	activeStepper = {},
	setActiveStepper = () => {},
	vendorInformation = {},
	setVendorInformation = () => {},
}) {
	return (
		<div>
			<Header />

			<FormComponent
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				vendorInformation={vendorInformation}
				setVendorInformation={setVendorInformation}
			/>
		</div>
	);
}

export default PaymentDetails;
