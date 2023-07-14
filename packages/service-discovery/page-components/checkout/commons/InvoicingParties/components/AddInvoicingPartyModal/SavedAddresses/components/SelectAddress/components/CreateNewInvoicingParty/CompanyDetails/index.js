import { Button } from '@cogoport/components';

import Layout from '../../AddressForm/Layout';
import useCompanyDetails from '../hooks/useCompanyDetails';

import styles from './styles.module.css';

function CompanyDetails({
	tradePartyType = {},
	savedDetails = {},
	setSavedDetails = () => {},
	setCurrentStep = () => {},
	onClickBack = () => {},
	showBackButton = true,
}) {
	const {
		loading,
		errors = {},
		orgControls = [],
		onSubmitOfCompanyDetails,
		companyDetailsFormProps = {},
	} = useCompanyDetails({
		savedDetails,
		setSavedDetails,
		setCurrentStep,
	});

	const { handleSubmit = () => {}, fields = {}, control } = companyDetailsFormProps;

	const SHOW_ELEMENTS = {};

	if (tradePartyType.value !== 'paying_party') {
		SHOW_ELEMENTS.verification_document = false;
	}

	return (
		<div className={styles.container}>
			<div className={styles.title}>Company Details</div>

			<div>
				<Layout
					controls={orgControls}
					fields={fields}
					errors={errors}
					showElements={SHOW_ELEMENTS}
					control={control}
				/>
			</div>

			<div className={styles.btn_grp}>
				{showBackButton && (
					<Button
						themeType="secondary"
						onClick={() => onClickBack()}
						style={{
							marginRight: '8px',
						}}
					>
						Back
					</Button>
				)}
				<Button
					disabled={loading}
					onClick={handleSubmit(onSubmitOfCompanyDetails)}
				>
					Proceed
				</Button>
			</div>
		</div>
	);
}

export default CompanyDetails;
