import { Textarea, Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import ApproveAndReject from '../../common/ApproveAndRejectData';

import MatchModal from './MatchModal';
import styles from './styles.module.css';

function SettlementModal({ settlementData, id, refetch, row, isEditable = true }) {
	const [show, setShow] = useState(false);

	const {
		list = {},
		incidentMappingId,
		settlementDate,
		supportingDocUrl,
	} = settlementData || {};

	const [value, setValue] = useState({
		date    : settlementDate || '',
		remarks : '',
	});

	return (
		<div>
			<div>
				<Button
					style={{ height: '30px', fontSize: '12px', width: '70px', fontWeight: '600' }}
					themeType="secondary"
					onClick={() => {
						setShow(true);
					}}
				>
					View
				</Button>
			</div>
			{
				show && 			(
					<Modal
						size="xl"
						show={show}
						onClose={() => {
							setShow(false);
						}}
					>
						<Modal.Header title={(
							<div className={styles.flex}>
								Settlement
								<div className={styles.drag}>( Drag and drop to set the matching hierarchy )</div>
							</div>
						)}
						/>

						<Modal.Body>
							{!isEditable && <ApproveAndReject row={row} />}
							<MatchModal
								value={value}
								setValue={setValue}
								checkedData={list}
								incidentMappingId={incidentMappingId}
								settlementDate={settlementDate}
								supportingDocUrl={supportingDocUrl}
								id={id}
								refetch={refetch}
								isEditable={isEditable}
							/>
							{isEditable && (
								<>
									<div className={styles.remarks}>Remarks*</div>
									<div className={styles.textarea}>
										<Textarea
											name="remark"
											size="md"
											placeholder="Enter Remark Here..."
											onChange={(v: string) => setValue((prev) => ({ ...prev, text: v }))}
											style={{ width: '700', height: '100px', marginBottom: '12px' }}
										/>
									</div>
								</>
							) }

						</Modal.Body>

						{isEditable && (
							<Modal.Footer>
								<div className={styles.button}>
									<Button
										size="md"
										themeType="secondary"
										style={{ marginRight: '8px' }}
										disabled={!(value?.remarks.length)}
										onClick={() => {
											// onReject();
										}}
									>
										Reject
									</Button>

									<Button
										size="md"
										style={{ marginRight: '8px' }}
										disabled={!(value?.remarks.length)}
										onClick={() => {
											// onApprove('settle');
										}}
									>
										Settle
									</Button>
								</div>
							</Modal.Footer>
						)}
					</Modal>
				)
			}
		</div>
	);
}
export default SettlementModal;
