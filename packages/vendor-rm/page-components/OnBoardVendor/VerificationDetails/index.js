// eslint-disable-next-line import/no-cycle
import ButtonLayout from '../../../commons/components/ButtonLayout/ButtonLayout';

import DisplayDetails from './DisplayDetails';
import Header from './Header';
import useKyc from './hooks/useKyc';
import styles from './styles.module.css';
import Success from './Success';

function VerificationDetails({
	vendorInformation = {},
	activeStepper,
	setActiveStepper = () => {},
	getVendor = () => {},
	getVendorLoading = false,
}) {
	const {
		onSubmit = () => {},
		showSuccessScreen = false,
		loading = false,
	} = useKyc({ getVendor });

	return (
		<div>
			{showSuccessScreen ? (
				<Success />
			) : (
				<>
					<Header />

					<div className={styles.button_container}>
						<div className={styles.text_container}>
							Submit the following details for verification?
						</div>

						<ButtonLayout
							activeStepper={activeStepper}
							setActiveStepper={setActiveStepper}
							onSubmit={onSubmit}
							loading={loading}
						/>
					</div>

					<DisplayDetails vendorInformation={vendorInformation} loading={getVendorLoading} />
				</>
			)}

		</div>
	);
}

export default VerificationDetails;
