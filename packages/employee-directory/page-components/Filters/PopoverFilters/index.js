import { Button } from '@cogoport/components';
import { IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useMemo } from 'react';

import { CONTROLS, CONTROL_MAPPING, getControls } from '../../utils/filterControls';

import styles from './styles.module.css';

function PopoverFilters({
	setFilters = () => {}, setOpenFilterPopover = () => {}, filters = {}, control = '',
	handleSubmit = () => {},
	reset = () => {},
	setemployeeFilters = () => {},
}) {
	const { employee_status } = filters;

	const onSubmit = (values) => {
		const FORM_VALUES = {};

		CONTROLS.forEach((val) => {
			if (!isEmpty(values?.[val?.name])) {
				FORM_VALUES[val.name] = values?.[val?.name];
			}
		});

		// setFilters((prev) => ({ ...prev, ...FORM_VALUES }));

		setFilters((prev) => ({ ...prev, page: 1 }));
		setemployeeFilters(FORM_VALUES);
		setOpenFilterPopover(false);
	};

	const onReset = () => {
		reset();
		setFilters((prev) => ({
			...prev,
			page: 1,
		}));
		setemployeeFilters({});
		setOpenFilterPopover(false);
	};

	const filterControls = useMemo(
		() => getControls(employee_status),
		[employee_status],
	);

	return (
		<div>

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
					{filterControls.map((val) => {
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
