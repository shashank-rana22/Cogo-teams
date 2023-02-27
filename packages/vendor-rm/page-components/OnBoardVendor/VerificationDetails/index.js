import { Checkbox } from '@cogoport/components';

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
		isDeclarationAccepted,
		setIsDeclarationAccepted,
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

						<div className={styles.declaration}>
							<Checkbox
								onChange={() => setIsDeclarationAccepted(!isDeclarationAccepted)}
								checked={isDeclarationAccepted}
							/>

							<div className={styles.text_declaration}>
								I hereby declare that I have verified the identity and financial
								information of
								{' '}
								<b>{vendorInformation.vendor_details.business_name}</b>
								{' '}
								for KYC purposes, and the information
								provided by them is true and accurate to the best of my knowledge.
								I confirm that all the necessary documents have been submitted and verified.
								I understand that any false or misleading information provided may lead to
								legal consequences.
							</div>

						</div>
						<ButtonLayout
							activeStepper={activeStepper}
							setActiveStepper={setActiveStepper}
							onSubmit={onSubmit}
							loading={loading || !isDeclarationAccepted}
						/>
					</div>

					<DisplayDetails vendorInformation={vendorInformation} loading={getVendorLoading} />
				</>
			)}

		</div>
	);
}

export default VerificationDetails;
