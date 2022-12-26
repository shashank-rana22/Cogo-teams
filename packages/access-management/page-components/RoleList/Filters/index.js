import React from 'react';
import Select from '@cogo/business-modules/form/components/Business/Select';
import { Container, SelectContainer } from './styles';
import { controls } from './utils/controls';
import SearchInput from '../../../common/SearchInput';

const Filters = ({
	filters = {},
	onChangeFilters = () => {},
	stakeHolderType = '',
}) => {
	const modifiedControls = controls(filters?.role_functions || []);

	return (
		<Container id="rnp_role_list_filters_container">
			<SearchInput
				value={filters?.q || ''}
				onChange={(value) => onChangeFilters({ q: value || undefined })}
				size="lg"
				placeholder="Search Role"
			/>
			<SelectContainer id="rnp_role_list_filters_select_container">
				{modifiedControls?.map((control) => {
					if (
						control.name === 'stakeholder_id' &&
						['cogoport', 'customer'].includes(stakeHolderType)
					) {
						return null;
					}
					if (control.name === 'navigation' && stakeHolderType === 'customer') {
						return null;
					}
					return (
						<Select
							{...control}
							value={filters?.[control?.name] || ''}
							onChange={(value) =>
								onChangeFilters({ [control?.name]: value || undefined })
							}
						/>
					);
				})}
			</SelectContainer>
		</Container>
	);
};

export default Filters;
