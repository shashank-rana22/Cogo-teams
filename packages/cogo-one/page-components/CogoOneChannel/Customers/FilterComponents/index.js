import { Button, cl } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import { useEffect } from 'react';

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
	setShowBotMessages = () => {},
	isomniChannelAdmin = false,
	tagOptions = [],
	showBotMessages = false,
	viewType,
}) {
	const filterControls = useGetControls({ isomniChannelAdmin, tagOptions, showBotMessages, viewType });

	const defaultValues = getDefaultValues({ filters: appliedFilters, filterControls });

	const {
		control, formState: { errors }, watch, setValue, handleSubmit,
	} = useForm({ defaultValues });

	const formValues = watch();

	const { assigned_to = '', observer = '' } = formValues || {};

	const showElements = {
		assigned_agent : assigned_to === 'agent',
		chat_tags      : observer === 'chat_tags' || isomniChannelAdmin,
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
		if (viewType === 'shipment_view') {
			setShowBotMessages(formValues?.shipment_view_bot_session?.[0] === 'bot_session');
			return;
		}
		if (!isomniChannelAdmin) {
			setShowBotMessages(filterValues?.observer === 'botSession');
		}
	};
	const renderComp = (singleField) => {
		const show = !(singleField?.name in showElements) || showElements[singleField?.name];
		return (
			show && (
				<Item
					{...singleField}
					control={control}
					value={formValues[singleField.name]}
					setValue={setValue}
					error={errors[singleField.name]}
				/>
			)
		);
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
				{filterControls.map((field) => (
					<div className={styles.filter_container} key={field.name}>
						{renderComp(field)}
					</div>
				))}
			</div>
			<div className={cl`${styles.sticky_boxshadow_styles} ${styles.footer}`}>
				<Button size="md" themeType="tertiary" onClick={() => setFilterVisible(false)}>Cancel</Button>
				<Button size="md" themeType="accent" type="submit">Apply</Button>
			</div>
		</form>
	);
}

export default FilterComponents;
