// eslint-disable-next-line import/no-cycle
import FormComponent from './FormComponent';
import Header from './Header';

function VendorDetails({
	activeStepper = {},
	setActiveStepper = () => {},
	setVendorInformation = () => {},
}) {
	return (
		<div>
			<Header />

			<FormComponent
				activeStepper={activeStepper}
				setActiveStepper={setActiveStepper}
				setVendorInformation={setVendorInformation}
			/>
		</div>
	);
}

export default VendorDetails;
