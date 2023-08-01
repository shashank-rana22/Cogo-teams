import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { CONTROL_MAPPING, CONTROLS } from '../../utils/filterControls';

import styles from './styles.module.css';

function PopoverFilters({
	setFilters = () => {}, setOpenFilterPopover = () => {}, control = '',
	handleSubmit = () => {},
	onReset = () => {},
	setemployeeFilters = () => {},
}) {
	const onSubmit = (values) => {
		const FORM_VALUES = {};

		CONTROLS.forEach((val) => {
			if (!isEmpty(values?.[val?.name])) {
				FORM_VALUES[val.name] = values?.[val?.name];
			}
		});

		setFilters((prev) => ({ ...prev, page: 1 }));
		setemployeeFilters(FORM_VALUES);
		setOpenFilterPopover(false);
	};

	return (
		<div className={styles.popover_filter_container}>
			<div className={styles.flex}>
				<div className={styles.title}>
					Filter
				</div>
				<Button onClick={onReset} size="sm">
					<IcMRefresh className={styles.refresh_icon} />
					Reset Filters
				</Button>
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.filter_container}>
					{CONTROLS.map((val) => {
						const Element = CONTROL_MAPPING[val.controlType];
						return (
							<div key={val.name} className={styles.controller_item}>
								<div className={styles.label}>{val.label}</div>
								<Element control={control} {...val} />
							</div>
						);
					})}
				</div>

				<div className={styles.btn_container}>
					<Button
						size="md"
						onClick={() => setOpenFilterPopover(false)}
						className={styles.reset_btn}
						themeType="secondary"
					>
						Cancel
					</Button>
					<Button size="md" type="submit">Apply</Button>
				</div>
			</form>
		</div>
	);
}

export default PopoverFilters;
