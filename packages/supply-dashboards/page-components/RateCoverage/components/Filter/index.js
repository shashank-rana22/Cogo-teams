import { Button, Select } from '@cogoport/components';
import { useEffect } from 'react';

import Controls from '../../configurations/filter';

import styles from './styles.module.css';

function Filter({ getStats, filter = {}, setFilter = () => {}, defaultFilterData = {} }) {
	useEffect(() => {
		getStats(filter);
	}, [filter, getStats]);

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<span style={{ fontWeight: '600' }}>Apply Filter</span>
				&nbsp;
				(These filters will be applied throughout the page)
			</div>
			<div className={styles.filter_container}>

				{Controls().map((control) => (
					<div key={control.name}>
						<div style={{ marginBottom: '5px' }}>
							{control.heading}
						</div>
						<Select
							placeholder="Type here..."
							value={filter[control.name]}
							onChange={(val) => {
								setFilter({ ...filter, [control.name]: val });
							}}
							{...control}
							isClearable
						/>
					</div>
				))}

				<Button
					size="md"
					themeType="tertiary"
					onClick={() => {
						setFilter(defaultFilterData);
					}}
				>
					Clear All Filters
				</Button>

			</div>
		</div>
	);
}

export default Filter;
