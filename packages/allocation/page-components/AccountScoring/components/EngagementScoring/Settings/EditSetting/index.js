// import { useForm } from '@cogoport/forms';
import { useSelector } from '@cogoport/store';

import useUpdateBiasSettings from '../../../../hooks/useUpdateBiasSettings';
import useUpdateDistributionSettings from '../../../../hooks/useUpdateDistributionSettings';
import useUpdatePercentileSettings from '../../../../hooks/useUpdatePercentileSettings';

import DistributionSettingsItem from './DistributionSettingsItem';
import Header from './Header';
import SettingsItem from './SettingsItem';
import styles from './styles.module.css';

function EditSetting(props) {
	const {
		useGetControls, inputStyle = 'input',
		setEditing = () => {}, heading = '', tooltipData = '',
		refetch = () => {},
		preFilledList = [],
		control,
		handleSubmit,
		errors,
		watch,
	} = props;

	const profile = useSelector((state) => state.profile);
	const { user = {} } = profile;
	const { id : performed_by_id = ' ' } = user;

	const {
		updatePercentile = () => {},
	} = useUpdatePercentileSettings();

	const {
		updateBias = () => {},
	} = useUpdateBiasSettings();

	const {
		updateDistribution = () => {},
	} = useUpdateDistributionSettings();

	// const formProps = useForm();
	// const { control, handleSubmit, formState: { errors } } = formProps;

	const onClose = () => {
		setEditing((pv) => !pv);
	};

	const onSave = async (formValues, e) => {
		e.preventDefault();

		if (inputStyle === 'percentile_input') {
			updatePercentile(formValues, onClose, refetch, preFilledList, performed_by_id);
		} else if (inputStyle === 'bias_input') {
			updateBias(formValues, onClose, refetch, preFilledList, performed_by_id);
		} else if (inputStyle === 'distribution_input') {
			updateDistribution(formValues, onClose, refetch, preFilledList, performed_by_id);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSave)}>
			<div className={styles.container}>
				<Header
					heading={heading}
					tooltipData={tooltipData}
					onClose={onClose}
				/>

				{preFilledList.map((item, index) => (
					<div key={item} className={styles.item}>
						{
							inputStyle === 'distribution_input'
								? (
									<DistributionSettingsItem
										item={item}
										useGetControls={useGetControls}
										index={index}
										inputStyle={inputStyle}
										control={control}
										errors={errors}
										watch={watch}
										distributionList={preFilledList}
									/>
								)
								: (
									<SettingsItem
										item={item}
										useGetControls={useGetControls}
										index={index}
										inputStyle={inputStyle}
										control={control}
										errors={errors}
										watch={watch}
									/>
								)

						}
					</div>
				))}
			</div>
		</form>
	);
}

export default EditSetting;
