import { Button } from '@cogoport/components';
import { IcMDownload, IcMEdit } from '@cogoport/icons-react';
import React from 'react';

import List from '../../commons/List';
import { ApprovedAWBFields } from '../../configurations/approved_awb';

function ApprovedAWB({ data, loading, setPage, setGenerate, setItem, setViewDoc, setEdit }) {
	const { fields } = ApprovedAWBFields;

	const handleDownloadMAWB = (singleItem) => {
		setViewDoc(true);
		setItem(singleItem);
	};

	const handleEditMAWB = (singleItem, action) => {
		setEdit(action || true);
		setGenerate(true);
		setItem(singleItem);
	};

	const functions = {
		handleDownload: (singleItem:any) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { handleDownloadMAWB(singleItem); }}
			>
				<IcMDownload fill="#8B8B8B" />

			</Button>
		),
		handleEdit: (singleItem:any) => (
			<Button
				themeType="linkUi"
				style={{ fontSize: 12 }}
				onClick={() => { handleEditMAWB(singleItem, 'edit'); }}
			>
				<IcMEdit fill="#8B8B8B" />
			</Button>
		),

	};

	return (
		<List
			fields={fields}
			data={data}
			setPage={setPage}
			loading={loading}
			functions={functions}
		/>
	);
}

export default ApprovedAWB;
