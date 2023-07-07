import React from 'react';

import FileList from './components/FileList';
import Header from './components/Header';
import useGetFileList from './useGetFileList';

function IhlsFileUploader() {
	const {
		params,
		setParams,
		fileListData,
		fileListLoading,
		refetch,
	} = useGetFileList();

	return (
		<div>
			<Header refetch={refetch} />

			<FileList
				params={params}
				setParams={setParams}
				fileListData={fileListData}
				fileListLoading={fileListLoading}
			/>
		</div>
	);
}

export default IhlsFileUploader;
