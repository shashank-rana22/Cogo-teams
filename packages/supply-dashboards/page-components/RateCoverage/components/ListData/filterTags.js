import { Tags } from '@cogoport/components';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { CustomTags } from './FilterComponent/customTags';
import { DateTag } from './FilterComponent/dateTags';

function FilterTags({ filter = {}, setFilter = () => {}, source = '', setSource = () => {} }) {
	const {
		service, cogo_entity_id, is_flash_booking_reverted,
		start_date, end_date,
	} = filter || {};

	return (
		<>
			<Tags
				size="md"
				items={[{
					disabled : false,
					children : startCase(service),
					color    : 'blue',
					tooltip  : false,
				}]}
			/>
			{source && (
				<CustomTags
					text={source}
					onClose={() => setSource('')}
					setValue={setSource}
				/>
			)}

			{start_date && (
				<DateTag
					date={start_date}
					label="StartDate"
					filterKey="start_date"
					filter={filter}
					setFilter={setFilter}
				/>
			)}

			{end_date && (
				<DateTag
					date={end_date}
					label="EndDate"
					filterKey="end_date"
					filter={filter}
					setFilter={setFilter}
				/>
			)}

			{cogo_entity_id && (
				<CustomTags
					text={cogo_entity_id === 'no_cogo_entity_id' ? 'All Entity' : 'My Entity'}
					onClose={() => setFilter({ ...filter, cogo_entity_id: '' })}
					setValue={setFilter}
				/>
			)}
			{is_flash_booking_reverted
&& (
	<Tags
		size="md"
		items={[{
			disabled : false,
			children : startCase(is_flash_booking_reverted === 'reverted'
				? 'Reverted' : 'Non Reverted'),
			color    : 'blue',
			tooltip  : false,
			closable : true,
		}]}
		onItemsChange={() => {
			setFilter({ ...filter, is_flash_booking_reverted: '' });
		}}
	/>
)}
		</>
	);
}

export default FilterTags;
