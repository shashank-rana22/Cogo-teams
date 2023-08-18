import { Checkbox } from '@cogoport/components';
import { useState } from 'react';

import airControls from '../../../../../../page-components/SearchResults/configurations/air/form-controls';
import Layout from '../../../../common/Layout';

import AdditionalModals from './AdditionalModals';
import Header from './Header';
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
}) {
	const [activeTab, setActiveTab] = useState('by_gross'); // by_gross and by_package
	const [weightInfo, setWeightInfo] = useState(true);
	const [dimensionsInfo, setDimensionsInfo] = useState(true);
	const [commoditySubtypeOptions, setCommoditySubTypeOptions] = useState([]);

	const controls = airControls({
		activeTab,
		commoditySubtypeOptions,
		setCommoditySubTypeOptions,
		setValue,
	});

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

				{activeTab === 'by_gross' ? (
					<div className={styles.checkbox_container}>
						<Checkbox
							key="weight_check_checkbox"
							checked={weightInfo}
							label="Each unit weighs less than 150 kg (330lbs)"
							onChange={(item) => {
								setShowModal('suggestion');
								setWeightInfo(item);
							}}
						/>

						<Checkbox
							key="dimensions_check_checkbox"
							checked={dimensionsInfo}
							label="Each unit dimensions is less than 110 x 65 x 65 cm"
							onChange={(item) => {
								setShowModal('suggestion');
								setDimensionsInfo(item);
							}}
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
		</div>
	);
}

export default FormModal;
