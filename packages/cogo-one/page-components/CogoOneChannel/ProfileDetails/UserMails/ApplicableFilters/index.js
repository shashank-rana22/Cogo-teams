import { cl, Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import FormLayout from '../../../../../common/FormLayout';
import { FILTER_CONTROLS } from '../../../../../configurations/user-email-filters';

import styles from './styles.module.css';

function ApplicableFilters({
	setShowPopover = () => {},
	setAppliedFilters = () => {},
	appliedFilters = {},
}) {
	const {
		control,
		watch,
		handleSubmit,
		reset = () => {},
	} = useForm({ defaultValues: appliedFilters });

	const formValue = watch();

	const isEmptyFilters = Object.keys(formValue || {}).every((key) => isEmpty(formValue[key]));

	const handleClearAll = () => {
		const nullFormValues = FILTER_CONTROLS.reduce(
			(prev, currentItem) => (
				{ ...prev, [currentItem?.name]: '' }
			),
			{},
		);

		reset(nullFormValues);
	};

	const handleApply = (val) => {
		setAppliedFilters(val);
		setShowPopover(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Filters
				</div>
				{!isEmptyFilters
					? (
						<div
							className={styles.clear_all}
							role="presentation"
							onClick={handleClearAll}
						>
							Clear All
						</div>
					) : null}
			</div>

			<FormLayout
				control={control}
				controls={FILTER_CONTROLS}
			/>

			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.footer}`}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setShowPopover(false)}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					type="submit"
					onClick={handleSubmit(handleApply)}
				>
					Apply
				</Button>
			</div>
		</div>

	);
}

export default ApplicableFilters;
