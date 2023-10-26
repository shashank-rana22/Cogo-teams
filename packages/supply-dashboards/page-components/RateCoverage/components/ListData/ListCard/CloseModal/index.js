import { Button, Checkbox, Modal, Textarea, Toast } from '@cogoport/components';
import React, { useState } from 'react';

import { CLOSE_REASON_OPTIONS, CLOSE_REQUEST, TWO_HUNDERD } from '../../../../configurations/helpers/constants';
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
	const [remarks, setRemarks] = useState('');
	const { loading, deleteRateJob } = useDeleteRateJob(filter?.service);
	const { deleteRequest } = useDeleteFreightRateRequests(filter?.service);
	const { deleteFeedbackRequest } = useDeleteFreightRateFeedbacks(filter?.service);

	const filteredCloseRequest = source === 'rate_request'
		? CLOSE_REQUEST.filter((reason) => reason.value !== 'lowest_rate_already_available_on_platform')
		: CLOSE_REQUEST;

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
				remarks,
			});
			if (resp === TWO_HUNDERD) {
				handelSucessAction();
			}
		}
		if (source === 'rate_request') {
			const resp = await deleteRequest({
				id              : data?.source_id,
				closing_remarks : data?.closing_remarks,
				checkboxValue,
				remarks,
			});
			if (resp === TWO_HUNDERD) {
				handelSucessAction();
			}
		}
		if (['critical_ports', 'expiring_rates', 'cancelled_shipments']
			?.includes(source)) {
			const resp = await deleteRateJob({ service: filter?.service, id: data?.id, checkboxValue });
			if (!resp?.error) {
				handelSucessAction();
			}
		}
	};

	return (
		<Modal show={showModal} onClose={() => { setShowModal((prev) => !prev); }} placement="top">
			<Modal.Header title="Please select reason for closing" />
			<Modal.Body>
				<p className={styles.bold_text}>Reasons</p>
				{['critical_ports', 'expiring_rates', 'cancelled_shipments'].includes(source)
				&& (
					<div>
						{CLOSE_REASON_OPTIONS.map((reason) => (
							<div key={reason}>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Checkbox
										checked={checkboxValue === reason.value}
										onChange={() => { setCheckboxValue(reason.value); }}
									/>
									{reason.label}
								</div>
							</div>
						))}
					</div>
				)}
				{['rate_feedback', 'rate_request']?.includes(source)
				&& (
					<div>
						<div>
							{filteredCloseRequest.map((reason) => (
								<div key={reason}>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<Checkbox
											checked={checkboxValue === reason.value}
											onChange={() => { setCheckboxValue(reason.value); }}
										/>
										{reason.label}
									</div>
								</div>
							))}
						</div>
						{checkboxValue === 'other_reason' && (
							<div>
								<Textarea
									className={styles.textarea}
									name="remark"
									size="md"
									placeholder="Enter Remarks Here"
									onChange={(value) => setRemarks(value)}
								/>
							</div>
						)}
					</div>
				)}

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
