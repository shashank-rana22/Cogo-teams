import React, { useState } from 'react';

import List from '../../commons/List';
import AmendmentFields from '../../configurations/amendment-fields';
import AmendmentList from '../AmendmentList';
import UploadModal from '../UploadModal';

import styles from './styles.module.css';

function Amendment({
	data = {},
	loading = false,
	page = 1,
	setPage = () => {},
	setGenerate = () => {},
	setItem = () => {},
	setViewDoc = () => {},
	edit = false,
	setEdit = () => {},
	listAPI = () => {},
	activeTab = '',
}) {
	const [showUpload, setShowUpload] = useState(null);
	const { fields } = AmendmentFields;

	const functions = {
		handleSerialId: (singleItem) => (
			<div>
				#
				{singleItem?.serialId}
			</div>
		),
		handleBlCategory: (singleItem) => (
			<div style={{ textTransform: 'uppercase' }}>
				{singleItem?.blCategory === 'mawb' ? 'MAWB' : 'HAWB/MAWB'}
			</div>
		),
		handleStatus: () => (
			<div className={styles.status}>
				Amend Requested
			</div>
		),
		handleStakeholder: (singleItem) => (
			singleItem?.stakeholderName
		),
	};

	return (
		<>
			<List
				fields={fields}
				data={data}
				page={page}
				setPage={setPage}
				loading={loading}
				functions={functions}
				activeTab={activeTab}
				Child={AmendmentList}
				setViewDoc={setViewDoc}
				setItem={setItem}
				listAPI={listAPI}
				edit={edit}
				setEdit={setEdit}
				setGenerate={setGenerate}
			/>
			<UploadModal
				showUpload={showUpload}
				setShowUpload={setShowUpload}
				listAPI={listAPI}
				edit={edit}
				setEdit={setEdit}
			/>
		</>
	);
}

export default Amendment;
