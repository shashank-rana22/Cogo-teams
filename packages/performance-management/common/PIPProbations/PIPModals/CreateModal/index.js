import { Button, Modal } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateLog from '../../../../hooks/useCreateLog';
import DecisionModal from '../UpdateModal/DecisionModal';

import EmployeesTable from './EmloyeesTable';

function CreateModal({
	item = {},
	source = 'log_modal',
	logType,
	modal,
	setModal = () => {},
	setItem = () => {},
	setRefetchList = () => {},
}) {
	const { onSubmitCreate = () => {} } = useCreateLog();
	const [disableNext, setDisableNext] = useState('');

	const onSubmitModalAction = () => {
		setRefetchList(true);
		setModal('');
		setItem({});
	};

	const clickedBack = () => {
		if (isEmpty(item)) {
			setModal('');
		} else {
			setItem({});
		}
	};

	const renderCreateModal = () => {
		if (source === 'manual_feedback') {
			return (<EmployeesTable source setItem={setItem} />);
		}

		if (isEmpty(item)) {
			return (
				<EmployeesTable source="log_modal" setItem={setItem} />
			);
		}
		return (
			<DecisionModal
				item={item}
				setItem={setItem}
				status={logType}
				type="create"
				setDisableNext={setDisableNext}
			/>
		);
	};

	return (
		<Modal
			show={modal === 'create' || 'manual_feedback'}
			onClose={() => {
				setModal('');
				setItem({});
			}}
			size="lg"
		>
			<Modal.Header title={`Create ${startCase(logType || '---')}`} />
			<Modal.Body
				style={{ maxHeight: '500px' }}
			>
				{renderCreateModal()}
			</Modal.Body>
			<Modal.Footer>
				<Button
					size="md"
					themeType="tertiary"
					onClick={clickedBack}
				>
					{isEmpty(item) ? 'Close' : 'Back'}

				</Button>

				{!isEmpty(item) && (
					<Button
						size="md"
						style={{ marginLeft: '8px' }}
						onClick={() => {
							onSubmitCreate(item, logType, onSubmitModalAction);
						}}
						disabled={disableNext}
					>
						Submit
					</Button>
				)}
			</Modal.Footer>
		</Modal>

	);
}

export default CreateModal;
