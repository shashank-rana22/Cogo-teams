import { ButtonIcon } from '@cogoport/components';
import { IcMUpload } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

import List from '../../common/CardList';
import { finalAwbFields } from '../../configurations/final-awb-fields';
import HawbList from '../HawbList';

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
	const { t } = useTranslation(['printingDesk']);
	const fields = finalAwbFields({ t });
	const [showUpload, setShowUpload] = useState({});

	const functions = {
		handleUpload: (singleItem) => {
			const item = { ...singleItem };
			item.documentType = 'airway_bill';
			item.type = 'FinalAwb';
			return (
				<ButtonIcon
					size="s"
					icon={<IcMUpload fill="#8B8B8B" />}
					themeType="primary"
					onClick={() => { setShowUpload(item); setEdit(false); }}
				/>
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
				Child={HawbList}
				functions={functions}
			/>
			{showUpload && (
				<UploadModal
					showUpload={showUpload}
					setShowUpload={setShowUpload}
					edit={edit}
					setEdit={setEdit}
					listAPI={listAPI}
				/>
			)}
		</>
	);
}

export default FinalAwb;
