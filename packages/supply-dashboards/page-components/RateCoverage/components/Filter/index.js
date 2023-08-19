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
				<span style={{ fontWeight: '700', fontSize: '16px' }}>Apply Filter</span>
				&nbsp;
				(These filters will be applied throughout the page)
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => {
						setFilter(defaultFilterData);
					}}
					style={{ float: 'right', color: '#828282', fontWeight: '600', paddingBottom: '16px' }}
				>
					Clear All Filters
				</Button>
			</div>

			<div className={styles.filter_container}>

				{Controls().map((control) => (
					<div key={control.name} style={{ width: control.width, marginLeft: '20px' }}>
						<div style={{ marginBottom: '5px' }}>
							{control.heading}
						</div>
						<Select
							placeholder={control.placeholder || 'Type Here...'}
							value={filter[control.name]}
							onChange={(val) => {
								setFilter({ ...filter, [control.name]: val });
							}}
							{...control}
							isClearable
						/>

					</div>
				))}

			</div>

		</div>
	);
}

export default Filter;
