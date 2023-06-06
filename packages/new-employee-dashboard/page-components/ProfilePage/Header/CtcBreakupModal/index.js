import { Modal, Button, Popover } from '@cogoport/components';
import React, { useState } from 'react';

import ModalComponent from '../ModalComponent';

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
}) {
	const [visible, setVisible] = useState(false);

	const { handleSubmit, reset, control } = formProps;

	const onClose = () => {
		setShowCtcBreakupModal(false);
		setInitialQuestion('');
		reset();
	};

	const onCheck = () => {
		setVisible(() => !visible);
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
					initialQuestion={initialQuestion}
					setInitialQuestion={setInitialQuestion}
					control={control}
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
								setShowCtcBreakupModal={setShowCtcBreakupModal}
								setInitialQuestion={setInitialQuestion}
								offerLetterApiRefetch={offerLetterApiRefetch}
							/>
						)}
					>
						<Button onClick={onCheck}>Submit</Button>
					</Popover>
				</div>
			</Modal.Footer>
		</Modal>
	);
}
