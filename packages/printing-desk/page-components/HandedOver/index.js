import { Modal } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { handedOverFields } from '../../configurations/handed-over';
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
	const { profile } = useSelector((state) => state);
	const [triggerManifest, setTriggerManifest] = useState('');
	const { fields } = handedOverFields;

	const allFunctions = { ...commonFunctions({ setViewDoc, setItem, setTriggerManifest, setEdit, profile }) };

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
