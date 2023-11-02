import { Tags } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';
import React from 'react';

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
				<Tags
					size="md"
					items={[{
						disabled : false,
						children : startCase(source),
						color    : 'blue',
						tooltip  : false,
						closable : true,
					}]}
					onItemsChange={() => {
						setSource('');
					}}
				/>
			)}
			{start_date && (
				<Tags
					size="md"
					items={[{
						disabled : false,
						children : `StartDate ${formatDate({
							date       : start_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
							separator  : '/',
						})}`,
						color    : 'blue',
						tooltip  : true,
						closable : true,
					}]}
					onItemsChange={() => {
						setFilter({ ...filter, start_date: '' });
					}}
				/>
			)}
			{end_date && (
				<Tags
					size="md"
					items={[{
						disabled : false,
						children : `EndDate ${formatDate({
							date       : end_date,
							dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
							formatType : 'date',
							separator  : '/',
						})}`,
						color    : 'blue',
						tooltip  : true,
						closable : true,
					}]}
					onItemsChange={() => {
						setFilter({ ...filter, end_date: '' });
					}}
				/>
			)}
			{cogo_entity_id && (
				<Tags
					size="md"
					items={[{
						disabled : false,
						children : startCase(cogo_entity_id === 'no_cogo_entity_id'
							? 'All Entity' : 'My Entity'),
						color    : 'blue',
						tooltip  : false,
						closable : true,
					}]}
					onItemsChange={() => {
						setFilter({ ...filter, cogo_entity_id: '' });
					}}
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
