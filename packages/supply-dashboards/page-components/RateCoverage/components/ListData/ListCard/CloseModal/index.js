import { Button, Checkbox, Modal, Toast } from '@cogoport/components';
import React from 'react';

import { CLOSE_REASON_OPTIONS } from '../../../../configurations/helpers/constants';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';

import styles from './styles.module.css';

function CloseModal({
	setShowModal = () => {},
	showModal = true,
	data = {},
	getListCoverage = () => {},
	filter = {},
	getStats = () => {},
}) {
	const {
		loading,
		deleteRateJob,
		checkboxValue,
		setCheckboxValue,
	} = useDeleteRateJob(filter?.service);

	const handleSubmit = async () => {
		if (!checkboxValue) return;
		const id = await deleteRateJob({ service: filter?.service, id: data?.id });
		if (id) {
			Toast.success('closed successfully');
			setShowModal(false);
			getStats();
			getListCoverage();
		}
	};
	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top" size="lg">
			<Modal.Header title="Please select reason for closing" />
			<Modal.Body style={{ maxHeight: '300px', minHeight: '200px' }}>
				<p className={styles.bold_text} style={{ marginLeft: '20px' }}>Reasons</p>
				<div>
					{CLOSE_REASON_OPTIONS.map((reason) => (
						<div style={{ display: 'flex', alignItems: 'center' }} key={reason}>
							<Checkbox
								checked={checkboxValue === reason.value}
								onChange={() => { setCheckboxValue(reason.value); }}
							/>
							{reason.label}
						</div>
					))}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<div>
					<Button
						onClick={handleSubmit}
						disabled={loading}
					>
						Submit
					</Button>
				</div>
			</Modal.Footer>
		</Modal>
	);
}

export default CloseModal;
