import { useState } from 'react';

import airControls from '../../../../../../page-components/SearchResults/configurations/air/form-controls';
import Layout from '../../../../common/Layout';

import Header from './Header';
import styles from './styles.module.css';

function FormModal({
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	errors = {},
}) {
	const [activeTab, setActiveTab] = useState('by_gross');

	const controls = airControls(activeTab);

	return (
		<div>
			<Header activeTab={activeTab} setActiveTab={setActiveTab} />

			<div className={styles.form}>
				<Layout
					controls={controls}
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
				/>
			</div>
		</div>
	);
}

export default FormModal;
