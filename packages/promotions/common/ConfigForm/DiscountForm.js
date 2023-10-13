import Layout from '../Layout';

import discountConfigControls from './controls/discountConfigControls';

function DiscountForm({
	control = {},
	errors = {},
	disabledFrequency = false,
}) {
	const discountControls = discountConfigControls({ disabledFrequency });
	return (
		<Layout
			controls={discountControls}
			control={control}
			errors={errors}
		/>
	);
}

export default DiscountForm;
