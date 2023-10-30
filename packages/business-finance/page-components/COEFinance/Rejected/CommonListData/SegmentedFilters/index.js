import { Input, Button } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../commons/Filters';
import FilterModal from '../../../Components/FilterModal/index';

import controls from './controls';
import styled from './styles.module.css';

function SegmentedFilters({
	setSearchValue,
	searchValue,
	filters,
	setFilters,
}) {
	const showFilterButton = !!filters?.statusUpdatedDateFrom
								|| !!filters?.statusUpdatedDateTo || !!filters?.rejectionRemarksType;

	const handleOnClickClearFilter = () => {
		setFilters({});
	};

	return (
		<div className={styled.main}>
			<div className={styled.segment}>
				<div className={styled.urgency}>
					<Filter
						controls={controls}
						filters={filters}
						setFilters={setFilters}
					/>
				</div>
				<FilterModal setFilters={setFilters} filters={filters} />
				{showFilterButton ? (
					<Button
						className={styled.clear_filter}
						size="md"
						themeType="secondary"
						onClick={handleOnClickClearFilter}
					>
						Clear Filter

					</Button>
				) : null }

			</div>

			<div className={styled.search_filter}>
				<div className={styled.search}>
					<Input
						name="q"
						size="sm"
						value={searchValue}
						onChange={(e) => setSearchValue(e)}
						placeholder="Search by Invoice No./Shipment ID/Supplier name..."
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchdark height={15} width={15} />
							</div>
						)}
					/>
				</div>

			</div>
		</div>
	);
}

export default SegmentedFilters;
