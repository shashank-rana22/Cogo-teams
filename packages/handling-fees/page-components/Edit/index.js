import { Loader } from '@cogoport/components';
import { useSelector } from '@cogoport/store';
import React from 'react';

import useGetHandlingFee from '../../hooks/useGetHandlingFee';
import Create from '../Create';

function Edit() {
	const { query } = useSelector(({ general }) => general);

	const {
		data = {},
		loading = false,
		refetchGetHandlingFeeData = () => { },
	} = useGetHandlingFee({ id: query?.id });

	if (loading) {
		return <Loader />;
	}

	return (
		<Create
			key={loading}
			type="edit"
			data={data}
			refetchGetHandlingFeeData={refetchGetHandlingFeeData}
		/>
	);
}

export default Edit;
