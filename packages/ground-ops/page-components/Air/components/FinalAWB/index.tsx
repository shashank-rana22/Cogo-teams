import { Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../commons/List';
import { FinalAwbFields } from '../../configurations/final_awb';
import UploadModal from '../UploadModal';

function FinalAwb({
	data, loading, page, setPage, edit, setEdit, listAPi,
}) {
	const { fields } = FinalAwbFields;
	const [showUpload, setShowUpload] = useState(null);

	const functions = {
		handleUpload: (singleItem) => {
			const item = { ...singleItem };
			item.documentType = 'airway_bill';
			item.type = 'FinalAwb';
			return (
				<Button
					themeType="linkUi"
					style={{ fontSize: 12 }}
					onClick={() => { setShowUpload(item); setEdit(false); }}
				>
					<IcMUpload fill="#8B8B8B" />
				</Button>
			);
		},
	};
	return (
		<>
			<List
				fields={fields}
				data={data}
				loading={loading}
				page={page}
				setPage={setPage}
				functions={functions}
			/>

			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				edit={edit}
				setEdit={setEdit}
				listAPi={listAPi}
			/>

		</>
	);
}

export default FinalAwb;
