import { Modal } from '@cogoport/components';
import { useState } from 'react';

import ApproveAndReject from '../../common/ApproveAndRejectData';
import ViewButton from '../../common/ViewButton';

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
		date    : settlementDate,
		remarks : '',
	});

	return (
		<div>
			<div>
				<ViewButton state={setShow} />
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
								setShow={setShow}
								setValue={setValue}
								checkedData={list}
								incidentMappingId={incidentMappingId}
								settlementDate={settlementDate}
								supportingDocUrl={supportingDocUrl}
								id={id}
								refetch={refetch}
								isEditable={isEditable}
							/>

						</Modal.Body>

					</Modal>
				)
			}
		</div>
	);
}
export default SettlementModal;
