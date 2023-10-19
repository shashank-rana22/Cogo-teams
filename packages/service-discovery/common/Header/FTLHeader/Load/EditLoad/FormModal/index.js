import { RadioGroup } from '@cogoport/components';
import { useMemo } from 'react';

import ftlControls from '../../../../../../page-components/SearchResults/configurations/ftl/form-controls';
import Layout from '../../../../../Layout';

import CommodityControl from './CommodityControl';
import Header from './Header';
import styles from './styles.module.css';

function FormModal({
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	errors = {},
	activeTab = '',
	setActiveTab = () => {},
	setCargoType = () => {},
	cargoType = 'cargo_per_package',
	commodity_type = '',
	loadType = '',
}) {
	const radioOptions = useMemo(() => [
		{ name: 'cargo_per_package', value: 'cargo_per_package', label: 'Per Package' },
		{ name: 'cargo_gross', value: 'cargo_gross', label: 'Total/Gross' },
	], []);

	const formValues = watch();

	const controls = ftlControls({
		activeTab,
		setValue,
		cargoType,
		formValues,
	});

	return (
		<div>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

			{activeTab === 'cargo' ? (
				<div className={styles.radio_group}>
					<span className={styles.label}>Select Type: </span>

					<RadioGroup
						options={radioOptions}
						onChange={setCargoType}
						value={cargoType}
					/>
				</div>
			) : null}

			<div className={styles.form}>
				<Layout
					controls={controls}
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
				/>

				<CommodityControl
					control={control}
					errors={errors}
					setValue={setValue}
					commodity_type={commodity_type}
					loadType={loadType}
				/>
			</div>
		</div>
	);
}

export default FormModal;
