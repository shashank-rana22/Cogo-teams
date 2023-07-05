import { Button, Pill } from '@cogoport/components';
import React from 'react';

import getElementController from '../../../../../configs/getElementController';

import getControls from './getControls';
import styles from './styles.module.css';
import useFilterDisplay from './useFilterDisplay';

function FilterFieldArray({
	setFilters,
	check,
	resetObjects,
}) {
	const {
		showFilter, control, handleSubmit, onSubmit, onClickReset, watch,
	} = useFilterDisplay({ setFilters, resetObjects });

	const watchTriveId = watch('tribe_id');

	const controls = getControls({ watchTriveId, check });

	return (
		<form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
			<div className={styles.header}>
				<div>
					{showFilter
						? <Pill color="green">Filters Applied</Pill>
						: <div className={styles.filter}>Apply Filters</div>}
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
				{(controls || [])?.map((item) => {
					const { label, type, name } = item || {};

					if (!type) return null;

					const Element = getElementController(type);

					return (
						<div key={name} style={{ width: '100%' }}>
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
