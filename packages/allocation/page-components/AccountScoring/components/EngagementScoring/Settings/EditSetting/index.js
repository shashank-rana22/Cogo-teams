import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';

import useGetEngagementScoringAccountStats from '../../../../hooks/useGetEngagementScoringAccountStats';
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

	const {
		statsLoading, statsList = [],
		onUpdateStats = () => {},
	} = useGetEngagementScoringAccountStats();

	const handleClick = () => {
		const watchFields = watch();

		const valuesForPrefilling = [];

		(preFilledList || []).forEach((element) => {
			const { id = '' } = element;

			const scores = {};

			Object.keys(watchFields).forEach((ele) => {
				const idx = ele.indexOf('_');

				if (ele.substring(0, idx) === id) {
					const attribute = ele.substring(idx + 1);

					scores[attribute] = watchFields[ele];
					scores.warmth = element.warmth;
				}
			});

			if (!isEmpty(scores)) {
				valuesForPrefilling.push(scores);
			}
		});

		const limit = [];

		valuesForPrefilling.forEach((element) => {
			const obj = {};
			obj.warmth = element.warmth || undefined;
			obj.lower_limit = element.range_from || undefined;
			obj.upper_limit = element.range_to || undefined;

			limit.push(obj);
		});

		onUpdateStats(limit);
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
										handleClick={handleClick}
										statsList={statsList}
										statsLoading={statsLoading}
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
