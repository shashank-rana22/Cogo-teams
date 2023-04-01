import { Button, Modal } from '@cogoport/components';
import { startCase, isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useCreateLog from '../../../../../../hooks/useCreateLog';
import DecisionModal from '../UpdateModal/DecisionModal';

import EmployeesTable from './EmloyeesTable';
import styles from './styles.module.css';

function CreateModal({
	item = {},
	source = 'log_modal',
	modal,
	setModal = () => {},
	setItem = () => {},
	setRefetchList = () => {},
}) {
	const { onSubmitCreate = () => {} } = useCreateLog();
	const [status, setStatus] = useState('');
	const [disableNext, setDisableNext] = useState('');

	const onSubmitModalAction = () => {
		setRefetchList(true);
		setModal('');
		setItem({});
	};

	const clickedBack = () => {
		if (status === '') {
			setModal('');
		}
		if (isEmpty(item)) {
			setStatus('');
		} else {
			setItem({});
		}
	};

	const renderCreateModal = () => {
		if (source === 'manual_feedback') {
			return (<EmployeesTable source setItem={setItem} />);
		}
		if (status) {
			if (isEmpty(item)) {
				return (
					<EmployeesTable source="log_modal" setItem={setItem} />
				);
			}
			return (
				<DecisionModal
					item={item}
					setItem={setItem}
					status={status}
					type="create"
					setDisableNext={setDisableNext}
				/>
			);
		}

		return (
			<div>
				<p style={{ padding: '8px' }}>Do you wish to create new Probation or PIP</p>
				<div className={styles.pip_select}>
					<Button
						size="xl"
						className={styles.pip_select_btn}
						themeType="secondary"
						onClick={() => setStatus('probation')}
						style={{ width: '120px' }}
					>
						Probations
					</Button>

					<Button
						size="xl"
						className={styles.pip_select_btn}
						themeType="secondary"
						onClick={() => setStatus('pip')}
						style={{ width: '120px' }}
					>
						PIP
					</Button>
				</div>
			</div>
		);
	};

	return (
		<Modal
			show={modal === 'create' || 'manual_feedback'}
			onClose={() => {
				setModal('');
				setItem({});
				setStatus('');
			}}
			size="lg"
		>
			<Modal.Header title={`Create ${startCase(status)}`} />
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
					{status ? 'Back' : 'Close'}

				</Button>

				{!isEmpty(item) && (
					<Button
						size="md"
						style={{ marginLeft: '8px' }}
						onClick={() => {
							onSubmitCreate(item, status, onSubmitModalAction);
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
