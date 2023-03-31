import { Popover, Button, TabPanel, Tabs } from '@cogoport/components';
import { useDebounceQuery, useForm, SelectController, InputController } from '@cogoport/forms';
import { IcMCross, IcMFilter } from '@cogoport/icons-react';
import React, { useState, useEffect } from 'react';

import SearchInput from '../../../../commons/SearchInput';

import getFilterControls from './getFilterControls';
import styles from './styles.module.css';

const CONTROL_MAPPING = {
	text   : InputController,
	select : SelectController,
};

function Header({
	activeList,
	setActiveList,
	setFilters,
}) {
	const [visible, setVisible] = useState(false);
	const [search, setSearch] = useState('');
	const [filtersApplied, setFiltersApplied] = useState(false);

	const { query, debounceQuery } = useDebounceQuery();

	const { control, watch, setValue } = useForm();

	const formValues = watch();

	const controls = getFilterControls();

	const handleReset = () => {
		setValue('announcement_type', undefined);
		setFilters((prev) => ({
			...prev,
			announcement_type: '',
		}));
		setVisible(false);
		setFiltersApplied(false);
	};

	const handleApply = () => {
		let anyFilterIsThere = false;

		Object.keys(formValues).forEach((key) => {
			if (formValues[key]?.length > 0) anyFilterIsThere = true;
		});

		if (anyFilterIsThere) {
			setFiltersApplied(true);
			setFilters((prev) => ({
				...prev,
				...formValues,
			}));
		}

		setVisible(false);
	};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			q: query || undefined,
		}));
	}, [query, setFilters]);

	const renderFilters = () => (
		<div className={styles.container}>
			<div className={styles.heading_reset}>
				<div className={styles.heading}>Filters</div>
				<div className={styles.rest}>
					<Button type="button" size="sm" themeType="primary" onClick={handleReset}>
						Reset
					</Button>

				</div>
			</div>
			<div className={styles.all_filters}>
				{controls.map((controlItem) => {
					const { type } = controlItem;
					const Component = CONTROL_MAPPING[type];
					return (
						<div className={styles.filter_item}>
							<div className={styles.label}>{controlItem.label}</div>
							<div className={styles.select_filter}>
								<Component key={controlItem.name} {...controlItem} control={control} />
							</div>
						</div>
					);
				})}
			</div>
			<div className={styles.footer}>
				<Button type="button" size="md" themeType="secondary" onClick={handleApply}>
					Apply
				</Button>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			<div className={styles.filters_container}>
				<div className={styles.input_bar}>
					<SearchInput
						value={search}
						onChange={(val) => setSearch(val)}
						size="md"
						placeholder="Search for an announcement"
					/>
					{search ? (
						<div className={styles.cross_icon}>
							<IcMCross onClick={() => setSearch('')} />
						</div>
					) : null}
				</div>
				<div className={styles.filters}>
					<Popover
						placement="left"
						caret={false}
						render={renderFilters()}
						visible={visible}
						onClickOutside={() => setVisible(false)}
					>
						<Button type="button" size="lg" themeType="secondary" onClick={() => setVisible(true)}>
							Filters
							<div className={styles.icon_container}>
								<IcMFilter style={{ marginLeft: '6px' }} />
								{filtersApplied ? <div className={styles.red_dot} /> : null}
							</div>
						</Button>
					</Popover>
				</div>
			</div>
			<div className={styles.tab_group}>
				<Tabs
					activeTab={activeList}
					themeType="primary"
					fullWidth
					onChange={setActiveList}
				>
					<TabPanel name="active" title="Active" />
					<TabPanel name="inactive" title="Inactive" />
				</Tabs>
			</div>
		</div>
	);
}

export default Header;
