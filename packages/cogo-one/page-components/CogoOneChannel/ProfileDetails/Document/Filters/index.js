import { Button, RadioGroup } from '@cogoport/components';
import { IcMCross, IcMRefresh } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { DOCUMENT_FILTERS_MAPPING } from '../../../../../constants';

import styles from './styles.module.css';

function Filters({
	setFilterVisible = () => {},
	filters,
	setFilters,
	handleFilters = () => {},
	handleReset = () => {},
}) {
	const emptyCheck = isEmpty(filters);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>
					Tag and submit as:
				</div>

				<div className={styles.styled_icon}>
					<IcMCross
						width={20}
						height={20}
						onClick={() => setFilterVisible(false)}
					/>
				</div>
			</div>

			<RadioGroup
				options={DOCUMENT_FILTERS_MAPPING}
				onChange={setFilters}
				value={filters}
				className={styles.filters}
			/>

			<div className={styles.actions}>
				<Button
					size="sm"
					themeType="tertiary"
					onClick={handleReset}
				>
					<div className={styles.refresh_icon}>
						<IcMRefresh width={10} height={10} />
					</div>
					Reset Status
				</Button>
				<Button
					size="sm"
					themeType="primary"
					onClick={handleFilters}
					disabled={emptyCheck}
				>
					Submit
				</Button>
			</div>
		</div>
	);
}

export default Filters;
