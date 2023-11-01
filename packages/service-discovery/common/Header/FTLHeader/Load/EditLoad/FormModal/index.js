import { RadioGroup } from '@cogoport/components';

import ftlControls from '../../../../../../page-components/SearchResults/configurations/ftl/form-controls';
import Layout from '../../../../../Layout';

import CommodityControl from './CommodityControl';
import Header from './Header';
import styles from './styles.module.css';

const OPTIONS = [
	{ name: 'cargo_per_package', value: 'cargo_per_package', label: 'Per Package' },
	{ name: 'cargo_gross', value: 'cargo_gross', label: 'Total/Gross' }];

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
	data = {},
	onClose = () => {},
	isMobile = false,
}) {
	const formValues = watch();

	const controls = ftlControls({
		activeTab,
		setValue,
		cargoType,
		formValues,
	});

	return (
		<>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				onClose={onClose}
				isMobile={isMobile}
			/>

			{activeTab === 'cargo' ? (
				<div className={styles.radio_group}>
					<span className={styles.label}>Select Type: </span>

					<RadioGroup
						options={OPTIONS}
						onChange={setCargoType}
						value={cargoType}
					/>
				</div>
			) : null}

			<div style={{ paddingTop: activeTab === 'cargo' ? 12 : 24 }}>
				<Layout
					controls={controls}
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
					data={data}
				/>

				<CommodityControl
					control={control}
					errors={errors}
					setValue={setValue}
					commodity_type={commodity_type}
					loadType={loadType}
				/>
			</div>
		</>
	);
}

export default FormModal;
