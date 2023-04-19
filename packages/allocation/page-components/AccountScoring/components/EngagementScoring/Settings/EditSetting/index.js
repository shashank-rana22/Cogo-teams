import { useForm } from '@cogoport/forms';

import useUpdateBiasSettings from '../../../../hooks/useUpdateBiasSettings';
import useUpdatePercentileSettings from '../../../../hooks/useUpdatePercentileSettings';

import Header from './Header';
import SettingsItem from './SettingsItem';
import styles from './styles.module.css';

function EditSetting(props) {
	const {
		ITEM_ARRAY = [], useGetControls, inputStyle = 'input',
		setEditing = () => {}, heading = '', tooltipData = '',
	} = props;

	const {
		updatePercentile = () => {},
	} = useUpdatePercentileSettings();

	const {
		updateBias = () => {},
	} = useUpdateBiasSettings();

	const formProps = useForm();
	const { control, handleSubmit, formState: { errors }, watch } = formProps;

	const onClose = () => {
		setEditing((pv) => !pv);
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();

		if (inputStyle === 'percentile_input') {
			updatePercentile(formValues); // percentile ...
		} else if (inputStyle === 'bias_input') {
			updateBias(formValues);
		} else if (inputStyle === 'distribution_input') {
			console.log('flame_hot_range_from : ', watch('flame_hot_range_from'));
			console.log('flame_hot_range_to : ', watch('flame_hot_range_to'));

			console.log('hot_range_from : ', watch('hot_range_from'));
			console.log('hot_range_to : ', watch('hot_range_to'));

			console.log('warm_range_from : ', watch('warm_range_from'));
			console.log('warm_range_to : ', watch('warm_range_to'));

			console.log('cold_range_from : ', watch('cold_range_from'));
			console.log('cold_range_to : ', watch('cold_range_to'));

			console.log('icy_cold_range_from : ', watch('icy_cold_range_from'));
			console.log('icy_cold_range_to : ', watch('icy_cold_range_to'));
		}

		// onClose();
	};

	return (
		<form onSubmit={handleSubmit(onSave)}>
			<div className={styles.container}>
				<Header
					heading={heading}
					tooltipData={tooltipData}
					onClose={onClose}
				/>

				{ITEM_ARRAY.map((item, index) => (
					<div key={item} className={styles.item}>
						<SettingsItem
							item={item}
							useGetControls={useGetControls}
							index={index}
							inputStyle={inputStyle}
							control={control}
							errors={errors}
						/>
					</div>
				))}
			</div>
		</form>
	);
}

export default EditSetting;
