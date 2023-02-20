// eslint-disable-next-line import/no-cycle
import ButtonLayout from '../../../commons/components/ButtonLayout/ButtonLayout';

// import DisplayDetails from './DisplayDetails';
import Header from './Header';
import styles from './styles.module.css';
import Success from './Success';

function VerificationDetails({
	// vendorInformation = {},
	activeStepper,
	setActiveStepper = () => {},
}) {
	return (
		<>
			<Header />

			<div className={styles.button_container}>
				<div className={styles.text_container}>
					Submit the following details for verification?
				</div>

				<ButtonLayout
					activeStepper={activeStepper}
					setActiveStepper={setActiveStepper}
				/>
			</div>

			{/* <DisplayDetails vendorInformation={vendorInformation} /> */}

			<Success />
		</>
	);
}

export default VerificationDetails;
