import { SelectController, InputController } from '@cogoport/forms';

import checkForDisabled from '../../../../../../../utils/checkForDisabled';

import styles from './styles.module.css';

const SLAB_UNIT_OPTIONS = [
	{
		value : 'month',
		label : 'in months',
	},
	{
		value : 'year',
		label : 'in years',
	},
];

const RULES = {
	required: 'Required',
};

function SlabFields({
	field = {}, index = 0, errors = {},
	control = () => {}, experience = 'default', showForm = false,
	slabsLength = 0,
}) {
	return (
		<>
			<div
				className={styles.slab_unit}
				key={`${field.id}.slab_unit`}
			>
				<div className={styles.label}>
					Experience Unit
					{true && <sup className={styles.sup}>*</sup>}
				</div>

				<div>
					<SelectController
						control={control}
						options={SLAB_UNIT_OPTIONS}
						name={`agent_experience_slabs.${index}.slab_unit`}
						disabled={checkForDisabled({ experience, controlName: 'slab_unit', index, showForm })}
					/>
					{errors?.agent_experience_slabs?.[index]?.slab_unit?.message
                    && (
	<div className={styles.error_msg}>
		{errors?.agent_experience_slabs?.[index]?.slab_unit?.message}
	</div>
                    )}
				</div>
			</div>

			<div
				className={styles.item}
				key={`${field.id}.slab_lower_limit`}
			>
				<div className={styles.label}>
					Experience Level Slab From
					{true && <sup className={styles.sup}>*</sup>}
				</div>

				<div>
					<InputController
						control={control}
						rules={RULES}
						name={`agent_experience_slabs.${index}.slab_lower_limit`}
						disabled={checkForDisabled({ experience, controlName: 'slab_lower_limit', index, showForm })}
					/>
					{errors?.agent_experience_slabs?.[index]?.slab_lower_limit?.message
						&& (
							<div className={styles.error_msg}>
								{errors?.agent_experience_slabs?.[index]?.slab_lower_limit?.message}
							</div>
						)}
				</div>
			</div>

			{index < 3 && (
				<>
					<div className={styles.hyphen}>-</div>

					<div
						className={styles.item}
						key={`${field.id}.slab_upper_limit`}
					>
						<div className={styles.label}>
							Experience Level Slab Upto
							{true && <sup className={styles.sup}>*</sup>}
						</div>

						<div>
							<InputController
								control={control}
								rules={RULES}
								name={`agent_experience_slabs.${index}.slab_upper_limit`}
								disabled={checkForDisabled({
									experience,
									controlName: 'slab_upper_limit',
									index,
									showForm,
									slabsLength,
								})}
							/>
							{errors?.agent_experience_slabs?.[index]?.slab_upper_limit?.message
						&& (
							<div className={styles.error_msg}>
								{errors?.agent_experience_slabs?.[index]?.slab_upper_limit?.message}
							</div>
						)}
						</div>
					</div>
				</>
			)}

		</>
	);
}

export default SlabFields;
