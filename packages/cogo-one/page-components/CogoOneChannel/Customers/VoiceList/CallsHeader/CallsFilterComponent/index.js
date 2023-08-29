import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';

import useGetCallControls from '../../../../../../configurations/useGetCallControls';

import Item from './Item';
import styles from './styles.module.css';

function getDefaultValues({ filters, filterControls }) {
	let defaultValues = {};

	filterControls.forEach((item) => {
		defaultValues = {
			...defaultValues,
			[item.name]: filters[item.name] || '',
		};
	});

	return defaultValues;
}

function CallsFilterComponents({
	setFilterVisible = () => {},
	appliedFilters = {},
	setAppliedFilters = () => {},
}) {
	const filterControls = useGetCallControls();

	const {
		control,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
	} = useForm({
		defaultValues: getDefaultValues(
			{
				filters: appliedFilters,
				filterControls,
			},
		),
	});

	const agentWatch = watch('agent');

	const isDisabled = isEmpty(agentWatch);

	const resetForm = () => {
		filterControls.forEach((item) => {
			setValue(item.name, getDefaultValues({ filters: {}, filterControls })[item.name]);
		});
		setAppliedFilters({});
		setFilterVisible(false);
	};

	const checkFiltersCount = Object.keys(appliedFilters).length;

	const handleClick = (val) => {
		setAppliedFilters(val);
		setFilterVisible(false);
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(handleClick)}>
			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.header}`}>
				<div className={styles.title}>
					Filters
				</div>
				<div className={styles.styled_icon}>
					{checkFiltersCount
						? (
							<Button
								size="md"
								themeType="tertiary"
								onClick={() => { resetForm(); }}
							>
								Clear All
							</Button>
						) : null}
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
								value={appliedFilters[singleField.name]}
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
					disabled={isDisabled}
				>
					Apply
				</Button>
			</div>
		</form>
	);
}

export default CallsFilterComponents;
