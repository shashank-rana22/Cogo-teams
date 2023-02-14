import { Modal, Button } from '@cogoport/components';
import { useState } from 'react';

import MatchModal from './MatchModal';
import styles from './styles.module.css';

function SettlementModal({ settlementData, id, refetch, isEditable = true }) {
	const [show, setShow] = useState(false);

	const {
		list = {},
		incidentMappingId,
		settlementDate,
		supportingDocUrl,
	} = settlementData || {};

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
							<MatchModal
								checkedData={list}
								incidentMappingId={incidentMappingId}
								settlementDate={settlementDate}
								supportingDocUrl={supportingDocUrl}
								id={id}
								refetch={refetch}
								isEditable={isEditable}
							/>

						</Modal.Body>

						{isEditable && (
							<Modal.Footer>
								<div className={styles.button}>
									<Button
										size="md"
										themeType="secondary"
										style={{ marginRight: '8px' }}
										// disabled={!(remark.length) || loading}
										onClick={() => {
											// onReject();
										}}
									>
										Reject
									</Button>

									<Button
										size="md"
										style={{ marginRight: '8px' }}
										// disabled={!(remark.length) || loading}
										onClick={() => {
											// onApprove();
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
