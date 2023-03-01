import { Button, Modal } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../commons/List';
import { NewAWBFields } from '../../configurations/new_awb_fields';

import Upload from './Upload';

function NewAWB({ data, loading, setPage, setGenerate, setItem, listAPi }) {
	const [showUpload, setShowUpload] = useState(null);
	const { fields } = NewAWBFields;
	const handleGenerateMAWB = (singleItem) => {
		setGenerate(true);
		setItem(singleItem);
	};

	const functions = {
		handleGenerate: (singleItem:any) => (
			<Button
				style={{ border: '1px solid #333', padding: '2px 8px', fontSize: 12 }}
				themeType="secondary"
				onClick={() => { handleGenerateMAWB(singleItem); }}
			>
				Generate
				{' '}
				{startCase(singleItem.blCategory)}
			</Button>
		),
		handleUpload: (singleItem) => (
			<Button onClick={() => { setShowUpload(singleItem); }}>Upload</Button>
		),
	};

	return (
		<>
			<List
				fields={fields}
				data={data}
				loading={loading}
				functions={functions}
				setPage={setPage}
			/>
			<Modal
				show={showUpload}
				onClose={() => { setShowUpload(null); }}
				size="md"
				style={{ height: '80%' }}
			>
				<Modal.Header title={(<h5>Upload Airway Bill</h5>)} />
				<Modal.Body style={{ minHeight: '720px' }}>
					<Upload showUpload={showUpload} setShowUpload={setShowUpload} listAPi={listAPi} />
				</Modal.Body>

			</Modal>
		</>

	);
}

export default NewAWB;
