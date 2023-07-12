import { isEmpty } from '@cogoport/utils';
import React from 'react';

import Layout from '../Layout';
import Loading from '../Loading';
import PremiumRate from '../PremiumRate';

function Form({
	control = () => {},
	controls = [],
	errors = {},
	loading = false,
	rateData = {},
}) {
	return (
		<div>
			<Layout control={control} controls={controls} errors={errors} />

			{loading ? <Loading /> : null}

			{!isEmpty(rateData) && !loading ? (
				<PremiumRate rateData={rateData} />
			) : null}
		</div>
	);
}

export default Form;
