import { Button, Select } from '@cogoport/components';
import { useEffect } from 'react';

import Controls from '../../configurations/filter';

import styles from './styles.module.css';

const CONSTANT_SIX_HUNDERED = 600;
const CONSTANT_SIXTEEN = 16;
const CONSTANT_TWENTY = 20;
const CONSTANT_SEVEN = 7;
function Filter({ getStats, filter = {}, setFilter = () => {}, defaultFilterData = {} }) {
	useEffect(() => {
		getStats(filter);
	}, [filter, getStats]);

	return (
		<div className={styles.parent}>
			<div className={styles.heading}>
				<span className={styles.apply_filters}>Apply Filter</span>
				&nbsp;
				(These filters will be applied throughout the page)
				<Button
					size="md"
					themeType="tertiary"
					onClick={() => {
						setFilter(defaultFilterData);
					}}
					style={{
						float         : 'right',
						color         : '#828282',
						fontWeight    : CONSTANT_SIX_HUNDERED,
						paddingBottom : CONSTANT_SIXTEEN,
					}}
				>
					Clear All Filters
				</Button>
			</div>

			<div className={styles.filter_container}>

				{Controls().map((control) => (
					<div key={control.name} style={{ width: control.width, marginLeft: CONSTANT_TWENTY }}>
						<div style={{ marginBottom: CONSTANT_SEVEN }}>
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
