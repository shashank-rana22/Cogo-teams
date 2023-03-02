import { Button } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React, { useState } from 'react';

import List from '../../commons/List';
import { NewAWBFields } from '../../configurations/new_awb_fields';
import UploadModal from '../UploadModal';

function NewAWB({ data, loading, page, setPage, setGenerate, setItem, listAPi }) {
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
				page={page}
				setPage={setPage}
			/>
			<UploadModal showUpload={showUpload} setShowUpload={setShowUpload} listAPi={listAPi} />
		</>
	);
}

export default NewAWB;
