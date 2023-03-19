import { Button } from '@cogoport/components';

import useCompanyDetails from '../hooks/useCompanyDetails';

import styles from './styles.module.css';

function CompanyDetails({
	filledDetails = {},
	tradePartyType = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
	showBackButton = false,
	onClickBack = () => {},
}) {
	const {
		loading,
		errors = {},
		orgControls = [],
		onSubmitOfCompanyDetails,
		companyDetailsFormProps = {},
	} = useCompanyDetails({
		filledDetails,
		setFilledDetails,
		setCurrentStep,
	});

	const { handleSubmit = () => {}, fields = {} } = companyDetailsFormProps;

	const showElements = {};

	if (tradePartyType.value !== 'paying_party') {
		showElements.verification_document = false;
	}

	return (
		<Container>
			<Title>Company Details</Title>

			<LayoutContainer>
				{/* <Layout
					controls={orgControls}
					fields={fields}
					errors={errors}
					showElements={showElements}
				/> */}
			</LayoutContainer>

			<BtnGrp>
				{showBackButton && (
					<Button
						className="secondary md"
						onClick={() => onClickBack()}
						style={{
							marginRight: '8px',
						}}
					>
						Back
					</Button>
				)}
				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(onSubmitOfCompanyDetails)}
				>
					Proceed
				</Button>
			</BtnGrp>
		</Container>
	);
}

export default CompanyDetails;
