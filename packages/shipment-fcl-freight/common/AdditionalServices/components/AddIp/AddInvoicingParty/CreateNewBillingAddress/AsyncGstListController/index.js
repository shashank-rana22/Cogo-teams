import { Select } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import useGetGstList from './useGetGstList';

function AsyncGstListController({ gstNumber, setGstNumber = () => {}, registrationNumber = '' }) {
	const { data } = useGetGstList({ registrationNumber });

	const options = (data?.data?.gsts || []).map((item) => ({ label: item, value: item }));

	return (
		<div>
			<label htmlFor="gst_list">Select GST</label>
			<Select
				size="sm"
				value={gstNumber}
				onChange={setGstNumber}
				options={options}
				className={styles.gst_select}
			/>
		</div>
	);
}

export default AsyncGstListController;
