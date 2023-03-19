import { Button } from '@cogoport/components';

import useDocuments from '../hooks/useDocuments';

import styles from './styles.module.css';

function AdditionalDocument({
	tradePartyType = {},
	setShowModal = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
	orgResponse = {},
	setCurrentStep = () => {},
	fetchOrganizationTradeParties = () => {},
	source = '',
}) {
	const {
		onSubmit = () => {},
		loading = false,
		documentControls = [],
		documentFormProps = {},
	} = useDocuments({
		filledDetails,
		setFilledDetails,
		orgResponse,
		tradePartyType,
		setShowModal,
		fetchOrganizationTradeParties,
		source,
	});

	const {
		formState: { errors = {} },
		fields = {},
		handleSubmit = () => {},
		watch = () => {},
	} = documentFormProps;

	const formValues = watch();

	const onClickBack = () => {
		setCurrentStep('bank_details');
		setFilledDetails({ ...filledDetails, documents: { ...formValues } });
	};

	return (
		<Container>
			<Title>Documents</Title>

			<div>
				{/* <Layout controls={documentControls} fields={fields} errors={errors} /> */}
			</div>

			<BtnGrp>
				<Button
					className="secondary md"
					onClick={() => onClickBack()}
					style={{
						marginRight: '8px',
					}}
					disabled={loading}
				>
					Back
				</Button>
				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit(onSubmit)}
				>
					{loading ? 'Submitting...' : 'Submit'}
				</Button>
			</BtnGrp>
		</Container>
	);
}

export default AdditionalDocument;
