import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

import useGetControls from '../../../../configurations/filter-controls';
import { VIEW_TYPE_GLOBAL_MAPPING } from '../../../../constants/viewTypeMapping';

import Item from './Item';
import styles from './styles.module.css';

function getDefaultValues({ filters, filterControls }) {
	let defaultValues = {};

	filterControls.forEach((item) => {
		defaultValues = {
			...defaultValues,
			[item.name]: filters[item.name] || (item.name === 'channels' ? [] : ''),
		};
	});

	return defaultValues;
}

function FilterComponents({
	setFilterVisible = () => {},
	setAppliedFilters = () => {},
	appliedFilters = {},
	setIsBotSession = () => {},
	tagOptions = [],
	viewType,
	activeSubTab,
}) {
	const filterControls = useGetControls({
		tagOptions,
		viewType,
		activeSubTab,
	});

	const {
		control,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
	} = useForm(
		{
			defaultValues: getDefaultValues(
				{
					filters: appliedFilters,
					filterControls,
				},
			),
		},
	);

	const formValues = watch();

	const { assigned_to = '' } = formValues || {};

	const showElements = {
		assigned_agent: assigned_to === 'agent',
	};

	let filterValues = {};

	const resetForm = () => {
		filterControls.forEach((item) => {
			setValue(item.name, item.name === 'channels' ? [] : '');
		});
	};

	useEffect(() => {
		if (assigned_to === 'me') {
			setValue('assigned_agent', '');
		}
	}, [assigned_to, setValue]);

	Object.keys(formValues).forEach((item) => {
		if (!isEmpty(formValues[item])) {
			filterValues = { ...filterValues, [item]: formValues[item] };
		}
	});

	const checkFiltersCount = Object.keys(filterValues).length;

	const handleClick = () => {
		setAppliedFilters(filterValues);
		setFilterVisible(false);

		if (!VIEW_TYPE_GLOBAL_MAPPING[viewType]?.permissions?.bot_message_toggle) {
			setIsBotSession(filterValues?.closed_session?.[GLOBAL_CONSTANTS.zeroth_index] === 'closed');
		}
	};

	return (
		<form className={styles.container} onSubmit={handleSubmit(handleClick)}>
			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.header}`}>
				<div className={styles.title}>
					Filters
					{checkFiltersCount ? ` (${checkFiltersCount})` : ''}
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
					(singleField) => {
						const show = (
							!(singleField?.name in showElements)
							|| showElements[singleField?.name]
						);

						if (!show) {
							return null;
						}

						return (
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
						);
					},
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

export default FilterComponents;
