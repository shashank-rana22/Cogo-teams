import { Select } from '@cogoport/components';
import React from 'react';

import useGetGstList from './useGetGstList';

function AsyncGstListController({ gstNumber, setGstNumber = () => {} }) {
	const registration_number = 'AAACV2809D';
	const { data } = useGetGstList({ registration_number });

	const options = (data?.data?.gsts || []).map((item) => ({ label: item, value: item }));

	return (
		<div>
			<label htmlFor="gst_list">Select GST</label>
			<Select
				name="gst_list"
				size="sm"
				value={gstNumber}
				onChange={(e) => setGstNumber(e)}
				options={options}
			/>
		</div>
	);
}

export default AsyncGstListController;
