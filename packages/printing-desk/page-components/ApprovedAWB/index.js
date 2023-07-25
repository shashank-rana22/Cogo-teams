import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { approvedAWBFields } from '../../configurations/approved-awb';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';
import commonFunctions from '../../utils/commonFunctions';
import GenerateManifestDoc from '../GenerateManifestDoc';
import HAWBList from '../HawbList';

function ApprovedAWB({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	setItem = () => {},
	setViewDoc = () => {},
	setEdit = () => {},
	listAPI = () => {},
}) {
	const [triggerManifest, setTriggerManifest] = useState('');
	const [handoverModal, setHandoverModal] = useState(false);
	const { fields } = approvedAWBFields;

	const { loading: updateLoading, updateShipment } = useUpdateShipmentDocument({ listAPI });

	const functions = {
		handleHandover: (singleItem) => {
			const { documentId, shipmentId, serviceId, documentUrl } = singleItem || {};
			const payload = {
				id              : documentId,
				shipmentId,
				documentType    : 'draft_airway_bill',
				handedOverForTd : true,
				serviceId,
				documentUrl,
			};
			return (
				<>
					<Button
						themeType="secondary"
						onClick={setHandoverModal((prev) => !prev)}
						disabled={updateLoading}
					>
						Handover
					</Button>
					{handoverModal && (
						<Modal
							show={handoverModal}
							onClose={() => { setHandoverModal(false); }}
						>
							<Modal.Body>
								Do you wish to confirm the Handover?
							</Modal.Body>
							<Modal.Footer>
								<Button onClick={() => updateShipment({ payload })}>Confirm</Button>
							</Modal.Footer>
						</Modal>
					)}
				</>
			);
		},
	};

	const allFunctions = { ...commonFunctions({ setViewDoc, setItem, setTriggerManifest, setEdit }), ...functions };

	return (
		<>
			<List
				fields={fields}
				data={data}
				page={page}
				setPage={setPage}
				loading={loading}
				functions={allFunctions}
				Child={HAWBList}
				setViewDoc={setViewDoc}
				setItem={setItem}
				setEdit={setEdit}
			/>
			{!isEmpty(triggerManifest) && (
				<Modal
					show={!isEmpty(triggerManifest)}
					onClose={() => { setTriggerManifest(''); }}
					size="lg"
				>
					<Modal.Body style={{ minHeight: '90vh' }}>
						<GenerateManifestDoc
							setTriggerManifest={setTriggerManifest}
							shipmentId={triggerManifest}
						/>
					</Modal.Body>

				</Modal>
			)}
		</>
	);
}

export default ApprovedAWB;
