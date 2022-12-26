import React from 'react';
import { Popover, Pills } from '@cogoport/front/components';
import { Container, FilterButton, Label } from './styles';
import SearchInput from '../../../../common/SearchInput';
import IcFilter from './ic-filter.svg';

const Filters = ({
	searchString = '',
	onChangeSearchNavigation = () => {},
	navStatus = {},
	setNavStatus = () => {},
}) => {
	const content = (
		<div style={{ padding: '12px 8px' }}>
			<Label>Navigation Status</Label>
			<Pills
				options={[
					{ label: 'Assigned', value: 'assigned' },
					{ label: 'Not Assigned', value: 'not_assigned' },
					{ label: 'All', value: 'all' },
				]}
				value={navStatus}
				onChange={(val) => setNavStatus(val)}
			/>
		</div>
	);
	return (
		<Container>
			<SearchInput
				value={searchString}
				onChange={onChangeSearchNavigation}
				size="lg"
				placeholder="Search Navigation"
			/>
			<Popover theme="light" content={content} interactive>
				<FilterButton>
					FILTER <IcFilter />
				</FilterButton>
			</Popover>
		</Container>
	);
};

export default Filters;
