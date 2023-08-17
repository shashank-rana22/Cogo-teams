import { Layout } from '@cogoport/surface-modules';
import React from 'react';

function UpdateQuoataion({ editQuoteData = {} }) {
	const { control = {}, controls = [], errors = {}, customValues = {} } = editQuoteData || {};
	return (
		<div>
			<Layout
				control={control}
				fields={controls}
				errors={errors}
				customValues={customValues}
			/>
		</div>
	);
}

export default UpdateQuoataion;
