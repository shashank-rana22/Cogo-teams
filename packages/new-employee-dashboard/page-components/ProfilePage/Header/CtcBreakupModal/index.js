import { Modal, Button, Popover } from '@cogoport/components';
import React, { useState } from 'react';

import ModalComponent from '../ModalComponent';
import usePostCreateEmployeeOfferLetter from '../usePostCreateEmployeeOfferLetter';

import styles from './styles.module.css';
import SubmitSection from './SubmitSection';

export default function CtcBreakupModal({
	showCtcBreakupModal,
	setShowCtcBreakupModal,
	ctcStructure,
	initialQuestion,
	setInitialQuestion,
	formProps,
	detail,
	offerLetterApiRefetch,
	error,
	setError,
	setCtcStructure = () => {},
	watch = () => {},
}) {
	const [visible, setVisible] = useState(false);

	const {
		loading,
		onFinalSubmit, shareOfferLetter, setShareOfferLetter,
		setOfferLetterError,
		offerLetterError,
	} = usePostCreateEmployeeOfferLetter({ setShowCtcBreakupModal, offerLetterApiRefetch });

	const { is_offer_letter_applicable } = detail || {};

	const {
		handleSubmit,
		reset,
		control,
	} = formProps;

	const onClose = () => {
		setShowCtcBreakupModal(false);
		setInitialQuestion('');
		reset();
	};

	const onCheck = () => {
		setVisible((pv) => !pv);
	};

	return (
		<Modal
			size="xl"
			show={showCtcBreakupModal}
			onClose={onClose}
			placement="center"
		>
			<Modal.Header title="Set CTC Values" />

			<Modal.Body>
				<ModalComponent
					ctcStructure={ctcStructure}
					setCtcStructure={setCtcStructure}
					initialQuestion={initialQuestion}
					setInitialQuestion={setInitialQuestion}
					control={control}
					error={error}
					setError={setError}
					watch={watch}
					offerLetterError={offerLetterError}
					setOfferLetterError={setOfferLetterError}
					formProps={formProps}
					shareOfferLetter={shareOfferLetter}
					setShareOfferLetter={setShareOfferLetter}
					is_offer_letter_applicable={is_offer_letter_applicable}
				/>
			</Modal.Body>

			<Modal.Footer>
				<div className={styles.popover_container}>
					<Popover
						placement="top"
						trigger="click"
						caret={false}
						visible={visible}
						render={(
							<SubmitSection
								detail={detail}
								initialQuestion={initialQuestion}
								ctcStructure={ctcStructure}
								setVisible={setVisible}
								handleSubmit={handleSubmit}
								reset={reset}
								setInitialQuestion={setInitialQuestion}
								setError={setError}
								loading={loading}
								shareOfferLetter={shareOfferLetter}
								setShareOfferLetter={setShareOfferLetter}
								onFinalSubmit={onFinalSubmit}
								setOfferLetterError={setOfferLetterError}
							/>
						)}
					>
						<Button onClick={onCheck} loading={loading}>Submit</Button>
					</Popover>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
