import { Button, Popover } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { IcMFilter } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React, { useState } from 'react';

import FilterForm from './renderFilterForm';
import styles from './styles.module.css';

const ZERO_VALUE = 0;
const ONE_VALUE = 1;

const isObjEmpty = (obj) => {
	let objIsEmpty = true;
	Object.keys(obj).forEach((key) => {
		if (obj[key]) { objIsEmpty = false; }
	});
	return isEmpty(obj) || objIsEmpty;
};

function FilterButton({ controls = [], filters = {}, setFilters = () => {} }) {
	const [filtersCount, setFiltersCount] = useState(ZERO_VALUE);
	const [visible, setVisible] = useState(false);

	const { control, watch, handleSubmit, reset, setValue } = useForm();

	const formValues = watch();

	const onClickOutside = () => {
		setVisible(false);
		Object.keys(filters).forEach((key) => setValue(key, filters[key]));
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
		setFiltersCount(ZERO_VALUE);
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
			if (['object', 'array'].includes(typeof formValues[key]) && !isEmpty(formValues[key])) {
				count += ONE_VALUE;
			} else if (formValues[key]) {
				count += ONE_VALUE;
			}
		});

		setFiltersCount(count);
	};

	return (
		<div className={styles.container}>

			<Popover
				placement="bottom"
				render={(
					<FilterForm
						controls={controls}
						handleSubmit={handleSubmit}
						handleApply={handleApply}
						handleReset={handleReset}
						control={control}
					/>
				)}
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
							<div style={{ color: '#fff', fontSize: 9, fontWeight: 700 }} />
						</div>
					) : null}

					<IcMFilter height={18} width={18} />
					Filter
				</Button>
			</Popover>
		</div>
	);
}

export default FilterButton;
