import { Button, Pill } from '@cogoport/components';
import React from 'react';

import getElementController from '../../../../configs/getElementController';

// import controls from './controls';
import getControls from './getControls';
import styles from './styles.module.css';
import useFilterDisplay from './useFilterDisplay';

function FilterFieldArray({ setFilters, filters, check }) {
	const {
		showFilter,
		control,
		handleSubmit,
		onSubmit,
		onClickReset,
		watch,
	} = useFilterDisplay({ setFilters });

	const WATCH_VALUES = watch();

	const controls = getControls({ WATCH_VALUES });

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.header}>
				<div>
					{showFilter ? <Pill color="green">Filters Applied</Pill> : <h4>Apply Filters</h4>}
				</div>

				<div className={styles.button_container}>
					<Button
						type="button"
						themeType="secondary"
						style={{ marginRight: '8px' }}
						onClick={onClickReset}
						size="sm"
					>
						Reset
					</Button>

					<Button
						size="sm"
						themeType="primary"
						type="submit"
					>
						Apply
					</Button>
				</div>
			</div>

			<div className={styles.filter_container}>
				{controls?.map((item) => {
					const { label, type, name } = item || {};
					const Element = getElementController(type);

					return (
						<div key={name}>
							<div className={styles.title}>{label}</div>

							<Element
								control={control}
								{...item}
							/>
						</div>
					);
				})}
			</div>
		</form>
	);
}

export default FilterFieldArray;
