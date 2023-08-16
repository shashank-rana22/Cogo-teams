import { useState } from 'react';

import airControls from '../../../../../../page-components/SearchResults/configurations/air/form-controls';

import Form from './Form';
import Header from './Header';

function FormModal({
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	errors = {},
}) {
	const [activeTab, setActiveTab] = useState('local_rates');

	const controls = airControls(activeTab);

	return (
		<div>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />

			<Form
				controls={controls}
				control={control}
				handleSubmit={handleSubmit}
				errors={errors}
				watch={watch}
				setValue={setValue}
			/>
		</div>
	);
}

export default FormModal;
