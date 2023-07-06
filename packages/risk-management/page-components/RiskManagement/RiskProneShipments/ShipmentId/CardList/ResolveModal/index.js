import { Modal, Button, Select, Textarea } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import useGetResolve from '../../../../hooks/useGetResolve';

import styles from './styles.module.css';

function ResolveModal({
	showResolveModal = false, setShowResolveModal = () => {}, itemData = {}, getDashboardData = () => {},
	getDahboardStatsData = () => {},
}) {
	const { alarms = [] } = itemData || {};
	const [remarks, setRemarks] = useState('');
	const [selectRiskReason, setSelectRiskReason] = useState('');
	const {
		onResolveMark,
		resolveLoading,
	} = useGetResolve({ itemData, remarks, getDashboardData, getDahboardStatsData, selectRiskReason });

	const riskReasonOptions = (alarms || []).map((item) => {
		const { risk_sub_reason = '', id = '' } = item || {};
		return {
			label : `${startCase(risk_sub_reason)}`,
			value : id,
		};
	});
	const disabledResolve = remarks === '' || resolveLoading || isEmpty(selectRiskReason);
	return (
		<div className={styles.container}>
			<Modal size="md" show={showResolveModal} onClose={() => { setShowResolveModal(false); }} placement="top">
				<Modal.Header title="Mark Resolve" />
				<Modal.Body>
					<div style={{ marginBottom: '12px' }}>
						<Select
							name="selectRiskReason"
							value={selectRiskReason}
							onChange={(val) => setSelectRiskReason(val)}
							placeholder="Select Risk Reason"
							options={riskReasonOptions}
							size="sm"
							style={{ width: '284px' }}
						/>
					</div>
					<div>
						Remarks -
					</div>
					<Textarea
						name="remarks"
						className={styles.text_area}
						size="lg"
						placeholder="Enter here..."
						onChange={(value) => setRemarks(value)}
					/>
				</Modal.Body>
				<Modal.Footer>
					<Button
						themeType="secondary"
						disabled={resolveLoading}
						style={{ marginRight: '8px' }}
						onClick={() => { setShowResolveModal(false); }}
					>
						Cancel
					</Button>
					<Button
						disabled={disabledResolve}
						onClick={() => { onResolveMark(); }}
					>
						Resolve

					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default ResolveModal;
