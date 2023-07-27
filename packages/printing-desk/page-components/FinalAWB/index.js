import { Button } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { FinalAwbFields } from '../../configurations/final-awb-fields';

import UploadModal from './UploadModal';

function FinalAwb({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	edit = false,
	setEdit = () => {},
	listAPI = () => {},
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
				listAPI={listAPI}
			/>
		</>
	);
}

export default FinalAwb;
