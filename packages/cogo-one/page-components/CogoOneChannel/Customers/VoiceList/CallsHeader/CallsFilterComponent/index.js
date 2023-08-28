import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import useGetCallControls from '../../../../../../configurations/useGetCallControls';

import Item from './Item';
import styles from './styles.module.css';

function CallsFilterComponents({
	setFilterVisible = () => {},
}) {
	const filterControls = useGetCallControls();

	const {
		control,
		formState: { errors },
		watch,
		setValue,
		// handleSubmit,
	} = useForm();

	const formValues = watch();

	return (
		<form className={styles.container}>
			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.header}`}>
				<div className={styles.title}>
					Filters
					{/* {checkFiltersCount ? ` (${checkFiltersCount})` : ''} */}
				</div>
				<div className={styles.styled_icon}>
					{/* {checkFiltersCount
						? (
							<Button
								size="md"
								themeType="tertiary"
								onClick={() => { resetForm(); }}
							>
								Clear All
							</Button>
						) : null} */}
				</div>
			</div>
			<div className={styles.filters_container}>
				{filterControls.map(
					(singleField) => (
						<div
							className={styles.filter_container}
							key={singleField.name}
						>
							<Item
								{...singleField}
								control={control}
								value={formValues[singleField.name]}
								setValue={setValue}
								error={errors[singleField.name]}
							/>
						</div>
					),
				)}
			</div>

			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.footer}`}>
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => setFilterVisible(false)}
				>
					Cancel
				</Button>
				<Button
					size="md"
					themeType="accent"
					type="submit"
				>
					Apply
				</Button>
			</div>
		</form>
	);
}

export default CallsFilterComponents;
