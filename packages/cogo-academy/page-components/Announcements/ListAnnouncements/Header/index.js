import { Popover, Button, TabPanel, Tabs } from '@cogoport/components';
import { useForm, SelectController, InputController } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

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
}) {
	const [searchState, setSearchState] = useState('');
	const [visible, setVisible] = useState(false);

	const { control, watch, setValue } = useForm();

	const formValues = watch();

	const controls = getFilterControls();

	const handleReset = () => {
		setValue('announcement_type', undefined);
		setValue('status', undefined);
		setVisible(false);
	};

	const handleApply = () => {
		setVisible(false);
	};

	const renderFilters = () => (
		<div className={styles.container}>
			<div className={styles.heading_reset}>
				<div className={styles.heading}>Filters</div>
				<div className={styles.rest}>
					<Button size="sm" themeType="primary" onClick={handleReset}>
						Reset
					</Button>

				</div>
			</div>
			<div className={styles.all_filters}>
				{controls.map((controlItem) => {
					const { type = '' } = controlItem;
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
				<Button size="md" themeType="secondary" onClick={handleApply}>
					Apply
				</Button>
			</div>
		</div>
	);

	return (
		<div className={styles.container}>
			{/* <div className={styles.filters_container}>
				<div className={styles.input_bar}>
					<SearchInput
						value={searchState}
						onChange={(val) => setSearchState(val)}
						size="md"
						placeholder="Search for an announcement"
					/>
				</div>
				<div className={styles.filters}>
					<Popover
						placement="left"
						caret={false}
						render={renderFilters()}
						visible={visible}
						onClickOutside={() => setVisible(false)}
					>
						<Button size="lg" themeType="secondary" onClick={() => setVisible(true)}>
							Filters
							<IcMFilter style={{ marginLeft: '6px' }} />
						</Button>
					</Popover>
				</div>
			</div> */}
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
