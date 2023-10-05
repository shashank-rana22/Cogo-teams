import { Button, Checkbox, Modal, Toast } from '@cogoport/components';
import React, { useState } from 'react';

import { CLOSE_REASON_OPTIONS } from '../../../../configurations/helpers/constants';
import useDeleteFreightRateFeedbacks from '../../../../hooks/useDeleteFreightRateFeedbacks';
import useDeleteFreightRateRequests from '../../../../hooks/useDeleteFreightRateRequests';
import useDeleteRateJob from '../../../../hooks/useDeleteRateJob';

import styles from './styles.module.css';

function CloseModal({
	setShowModal = () => {},
	showModal = true,
	data = {},
	getListCoverage = () => {},
	filter = {},
	getStats = () => {},
	source = {},
}) {
	const [checkboxValue, setCheckboxValue] = useState('');
	const {
		loading,
		deleteRateJob,
	} = useDeleteRateJob(filter?.service);
	const { deleteRequest } = useDeleteFreightRateRequests(filter?.service);
	const { deleteFeedbackRequest } = useDeleteFreightRateFeedbacks(filter?.service);
	const handelSucessAction = () => {
		Toast.success('closed successfully');
		setShowModal(false);
		getStats();
		getListCoverage();
	};
	const handleSubmit = async () => {
		if (!checkboxValue) return;
		if (source === 'rate_feedback') {
			const resp = await deleteFeedbackRequest({
				id              : data?.source_id,
				closing_remarks : data?.closing_remarks,
				checkboxValue,
			});
			if (resp) {
				handelSucessAction();
			}
		}
		if (source === 'rate_request') {
			const resp = await deleteRequest({
				id              : data?.source_id,
				closing_remarks : data?.closing_remarks,
				checkboxValue,
			});
			if (resp) {
				handelSucessAction();
			}
		}
		if (['critical_ports', 'expiring_rates', 'cancelled_shipments']
			?.includes(source)) {
			const resp = await deleteRateJob({ service: filter?.service, id: data?.id, checkboxValue });
			if (resp) {
				handelSucessAction();
			}
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
