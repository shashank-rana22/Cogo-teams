import { Button, Loader } from '@cogoport/components';
import React from 'react';

import useBankAccount from '../hooks/useBankAccount';

import styles from './styles.module.css';

function BankAccount({
	setCurrentStep = () => {},
	filledDetails = {},
	setFilledDetails = () => {},
}) {
	const {
		onSubmit = () => {},
		bankAccountControls = [],
		bankAccountFormProps = {},
		onBlurIfscControl = () => {},
		bankDetailsLoading,
	} = useBankAccount({
		setCurrentStep,
		filledDetails,
		setFilledDetails,
	});

	const {
		fields = {},
		watch = () => {},
		formState: { errors = {} },
		handleSubmit = () => {},
	} = bankAccountFormProps;

	const formValues = watch();

	const newFields = {};
	Object.entries(fields).forEach(([controlName, field]) => {
		let newField = { ...field };
		if (controlName === 'ifsc_number') {
			newField = {
				...newField,
				onBlur: () => onBlurIfscControl({ code: formValues.ifsc_number }),
				...(bankDetailsLoading && {
					suffix: (
						<Loader themeType="primary" />
					),
				}),
			};
		}

		newFields[controlName] = newField;
	});

	const onClickBack = () => {
		setCurrentStep('billing_address');
		setFilledDetails({ ...filledDetails, bank_details: { ...formValues } });
	};

	return (
		<Container>
			<Title>Bank Details</Title>

			<LayoutContainer>
				{/* <Layout
					controls={bankAccountControls}
					fields={newFields}
					errors={errors}
				/> */}
			</LayoutContainer>

			<BtnGrp>
				<Button
					className="secondary md"
					onClick={() => onClickBack()}
					style={{ marginRight: '8px' }}
				>
					Back
				</Button>

				<Button className="primary md" onClick={handleSubmit(onSubmit)}>
					Proceed
				</Button>
			</BtnGrp>
		</Container>
	);
}

export default BankAccount;
