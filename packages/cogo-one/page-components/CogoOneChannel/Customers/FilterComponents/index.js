import { Button, Checkbox, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import useGetControls from '../../../../configurations/filter-controls';

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
	setActiveCardId = () => {},
	setShowBotMessages = () => {},
	showBotMessages = false,
	isomniChannelAdmin = false,
}) {
	const [botToggle, setBotToggle] = useState(false);

	const filterControls = useGetControls(isomniChannelAdmin);

	const defaultValues = getDefaultValues({ filters: appliedFilters, filterControls });

	const {
		control, formState: { errors }, watch, setValue, handleSubmit,
	} = useForm({ defaultValues });

	const formValues = watch();
	const { assigned_to = '' } = formValues || {};
	const showElements = { assigned_agent: assigned_to === 'agent' };

	let filterValues = {};

	const resetForm = () => {
		filterControls.forEach((item) => {
			setValue(item.name, item.name === 'channels' ? [] : '');
		});
	};

	useEffect(() => {
		if (botToggle) {
			resetForm();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [botToggle]);
	useEffect(() => {
		if (assigned_to === 'me') {
			setValue('assigned_agent', '');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [assigned_to]);
	useEffect(() => {
		setBotToggle(showBotMessages);
	}, [showBotMessages]);

	Object.keys(formValues).forEach((item) => {
		if (!isEmpty(formValues[item])) {
			filterValues = { ...filterValues, [item]: formValues[item] };
		}
	});

	const checkFiltersCount = Object.keys(filterValues).length;

	const handleClick = () => {
		setActiveCardId('');
		setAppliedFilters(filterValues);
		setFilterVisible(false);
		setShowBotMessages(botToggle);
	};
	const renderComp = (singleField) => {
		const show = !(singleField?.name in showElements) || showElements[singleField?.name];
		if (singleField?.onlyForAdmin) {
			if (isomniChannelAdmin) {
				return (
					show && (
						<Item
							{...singleField}
							control={control}
							value={formValues[singleField.name]}
							setValue={setValue}
							error={errors[singleField.name]}
							botToggle={botToggle}
						/>
					)
				);
			}
			return null;
		}
		return (
			show && (
				<Item
					{...singleField}
					control={control}
					value={formValues[singleField.name]}
					setValue={setValue}
					error={errors[singleField.name]}
					botToggle={botToggle}
				/>
			)
		);
	};
	return (
		<form className={styles.container} onSubmit={handleSubmit(handleClick)}>
			<div className={styles.header}>
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
			{!isomniChannelAdmin && (
				<div className={styles.styled_flex}>
					<Checkbox
						name="closed"
						size="sm"
						onChange={() => setBotToggle((p) => !p)}
						checked={botToggle}
					/>
					<div>
						Closed
					</div>
				</div>
			)}

			{filterControls.map((field) => (
				<div className={cl`${styles.filter_container} ${botToggle ? styles.disabled : ''}`} key={field.name}>
					{renderComp(field)}
				</div>
			))}

			<div className={styles.actions}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent" type="submit">Apply</Button>
			</div>
		</form>
	);
}

export default FilterComponents;
