import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import getElementController from '../../../../../../../../configs/getElementController';

import styles from './styles.module.css';

const isObjEmpty = (obj) => {
	let objIsEmpty = true;
	Object.keys(obj).forEach((key) => {
		if (obj[key]) { objIsEmpty = false; }
	});
	return isEmpty(obj) || objIsEmpty;
};

function FilterForm({ controls = [], filters = {}, setFilters = () => {} }) {
	const [filtersCount, setFiltersCount] = useState(0);
	const [visible, setVisible] = useState(false);

	const { control, watch, handleSubmit, reset } = useForm();

	const formValues = watch();

	const onClickOutside = () => {
		setVisible(false);
		if (filtersCount) return;
		reset();
	};

	const handleReset = () => {
		if (filtersCount) {
			const FILTEROBJ = {};

			Object.keys(formValues).forEach((key) => {
				FILTEROBJ[key] = undefined;
			});

			setFilters(FILTEROBJ);
		}

		reset();
		setFiltersCount(0);
		setVisible(false);
	};

	const handleApply = () => {
		if (isObjEmpty(formValues)) {
			return;
		}
		setFilters(formValues);
		setVisible(false);

		let count = 0;

		Object.keys(formValues).forEach((key) => {
			if (formValues[key] && !isEmpty(formValues[key])) count += 1;
		});

		setFiltersCount(count);
	};

	const renderFilterForm = (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.heading}>Search</div>

				<div className={styles.button_container}>
					<Button size="sm" themeType="primary" style={{ marginRight: 12 }} onClick={handleReset}>
						Reset
					</Button>

					<Button size="sm" themeType="secondary" onClick={handleSubmit(handleApply)}>
						Apply
					</Button>
				</div>
			</div>

			<div className={styles.form}>
				{controls.map((controlItem, index) => {
					const { label, type, name, span } = controlItem;

					const flex = ((span || 12) / 12) * 100;

					const Element = getElementController(type);

					return (
						<div
							key={`${name}_${label}`}
							className={styles.form_item}
							style={{ width: `${flex}%`, marginTop: index === 0 ? 0 : 20 }}
						>
							<div className={styles.label}>
								{label || ''}
								{' '}
								{controlItem?.rules?.required ? (
									<div className={styles.required_mark}>*</div>
								) : null}
							</div>

							<Element
								{...controlItem}
								name={name}
								label={label}
								control={control}
								value={filters[name] || formValues[name]}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);

	return (
		<div className={styles.container}>

			<Popover
				placement="bottom"
				render={renderFilterForm}
				onClickOutside={onClickOutside}
				visible={visible}
			>
				<Button
					size="md"
					themeType="secondary"
					className={styles.button}
					onClick={() => (visible ? onClickOutside() : setVisible(true))}
				>
					{filtersCount ? (
						<div className={styles.red_dot}>
							<div style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>{filtersCount}</div>
						</div>
					) : null}

					<IcMFilter height={18} width={18} />
					Filter
				</Button>
			</Popover>
		</div>
	);
}

export default FilterForm;
