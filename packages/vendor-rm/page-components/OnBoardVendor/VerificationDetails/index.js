// eslint-disable-next-line import/no-cycle
import ButtonLayout from '../../../commons/components/ButtonLayout/ButtonLayout';

function VerificationDetails({
	activeStepper,
	setActiveStepper = () => {},
}) {
	return (
		<ButtonLayout
			activeStepper={activeStepper}
			setActiveStepper={setActiveStepper}
		/>
	);
}

export default VerificationDetails;
