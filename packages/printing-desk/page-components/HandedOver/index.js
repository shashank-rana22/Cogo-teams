import { Button, Modal } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { approvedAWBFields } from '../../configurations/approved-awb';
import useUpdateShipmentDocument from '../../hooks/useUpdateShipmentDocument';
import commonFunctions from '../../utils/commonFunctions';
import GenerateManifestDoc from '../GenerateManifestDoc';
import HAWBList from '../HawbList';

function HandedOver({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	setItem = () => {},
	setViewDoc = () => {},
	setEdit = () => {},
}) {
	const [triggerManifest, setTriggerManifest] = useState('');
	const { fields } = approvedAWBFields;

	const { loading: updateLoading, updateShipment } = useUpdateShipmentDocument();

	const functions = {
		handleHandover: (singleItem) => {
			const { documentId, shipmentId, serviceId, documentUrl } = singleItem || {};
			const payload = {
				id              : documentId,
				shipment_id     : shipmentId,
				document_type   : 'draft_airway_bill',
				handedOverForTd : true,
				serviceId,
				documentUrl,
			};
			return (
				<Button
					themeType="secondary"
					onClick={() => { updateShipment({ payload }); }}
					disabled={updateLoading}
				>
					Handover
				</Button>
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

export default HandedOver;
