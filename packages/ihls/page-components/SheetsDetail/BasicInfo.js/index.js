import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import useAthenaFileDetails from '../../../hooks/useAthenaFileDetails';

import FileDetails from './FileDetails';
import styles from './styles.module.css';
import Tiles from './Tiles';

function BasicInfo() {
	const router = useRouter();
	const { data = [], loading = false } = useAthenaFileDetails({ fileId: router.query.file_id });
	const listInfoData = isEmpty(data?.data) ? {} : data?.data?.[GLOBAL_CONSTANTS.zeroth_index];

	return (
		<div className={styles.container}>
			<FileDetails loading={loading} data={listInfoData} />
			<Tiles loading={loading} data={listInfoData} />
		</div>
	);
}

export default BasicInfo;
