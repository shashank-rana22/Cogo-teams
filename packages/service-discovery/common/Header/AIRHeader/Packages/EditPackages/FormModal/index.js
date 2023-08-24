import { Checkbox } from '@cogoport/components';
import { useState, useEffect } from 'react';

import airControls from '../../../../../../page-components/SearchResults/configurations/air/form-controls';
import Layout from '../../../../../Layout';

import AdditionalModals from './AdditionalModals';
import Header from './Header';
import getSinglePackageDetails from './helpers/getSinglePackageDetails';
import ShipmentTotal from './ShipmentTotal';
import styles from './styles.module.css';

function FormModal({
	control = () => {},
	watch = () => {},
	handleSubmit = () => {},
	setValue = () => {},
	errors = {},
	showModal = '',
	setShowModal = () => {},
	handleApply = () => {},
	activeTab = '',
	setActiveTab = () => {},
}) {
	const [commoditySubtypeOptions, setCommoditySubTypeOptions] = useState([]);
	const [selectedWeightType, setSelectedWeightType] = useState('weight_by_unit');

	const controls = airControls({
		activeTab,
		commoditySubtypeOptions,
		setCommoditySubTypeOptions,
		setValue,
		selectedWeightType,
		setSelectedWeightType,
	});

	const {
		packageQuantity = [],
		packageWeight = [],
		packageVolume = [],
	} = getSinglePackageDetails({ watch });

	const onChangeCheckbox = () => {
		setShowModal('suggestion');
	};

	useEffect(() => {
		if (activeTab === 'cargo_gross') return;

		const weightUnit = selectedWeightType === 'weight_by_unit' ? 'kg_unit' : 'kg_total';

		const packages = watch('packages');
		(packages || []).forEach((_, index) => {
			setValue(`packages[${index}].weight_unit`, weightUnit);
		});
	}, [selectedWeightType, setValue, activeTab, watch]);

	return (
		<div>
			<Header
				activeTab={activeTab}
				setActiveTab={setActiveTab}
			/>

			{activeTab === 'cargo_per_package' ? (
				<ShipmentTotal
					packageWeight={packageWeight}
					packageQuantity={packageQuantity}
					packageVolume={packageVolume}
				/>
			) : null}

			<div className={styles.form}>
				<Layout
					controls={controls}
					control={control}
					handleSubmit={handleSubmit}
					errors={errors}
					watch={watch}
					setValue={setValue}
					selectedWeightType={selectedWeightType}
				/>
			</div>

			{activeTab === 'cargo_gross' ? (
				<div className={styles.checkbox_container}>
					<Checkbox
						key="weight_check_checkbox"
						checked
						label="Each unit weighs less than 150 kg (330lbs)"
						onChange={onChangeCheckbox}
					/>

					<Checkbox
						key="dimensions_check_checkbox"
						checked
						label="Each unit dimensions is less than 110 x 65 x 65 cm"
						onChange={onChangeCheckbox}
					/>
				</div>
			) : null}

			{showModal ? (
				<AdditionalModals
					setActiveTab={setActiveTab}
					setShow={setShowModal}
					show={showModal}
					handleApply={handleApply}
					handleSubmit={handleSubmit}
				/>
			) : null}
		</div>
	);
}

export default FormModal;
