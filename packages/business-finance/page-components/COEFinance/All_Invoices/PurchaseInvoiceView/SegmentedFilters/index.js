import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../commons/Filters';
import SegmentedControl from '../../../../commons/SegmentedControl/index';
import FilterModal from '../../../Components/FilterModal/index';
import filtersData from '../../../constants/purchase-list-filters';
import filtersUrgentData from '../../../constants/purchase-list-segments';

import controls from './controls';
import styled from './styles.module.css';

function SegmentedFilters({
	setCurrentTab,
	currentTab,
	statsData,
	tab,
	setTab,
	setSearchValue,
	searchValue,
	filters,
	setFilters,
	itemData,
}) {
	return (
		<>
			<div className={styled.filter_input}>
				<div className={styled.filter_data}>
					<SegmentedControl
						options={filtersData(statsData)}
						activeTab={currentTab}
						setActiveTab={setCurrentTab}
						color="#ED3726"
						background="#FFFAEB"
					/>
				</div>
			</div>
			<div className={styled.main}>
				<div className={styled.segment}>
					<div className={styled.filter_data_urgent}>
						<SegmentedControl
							options={filtersUrgentData({ itemData, tab })}
							activeTab={tab}
							setActiveTab={setTab}
							color="#ED3726"
							background="#FFFAEB"
						/>
					</div>
					<div className={styled.urgency}>
						<Filter
							controls={controls}
							filters={filters}
							setFilters={setFilters}
						/>
					</div>
					<FilterModal setFilters={setFilters} filters={filters} />
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
								<IcMSearchlight
									height={17}
									width={17}
									style={{ margin: '0 8px' }}
								/>
							)}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default SegmentedFilters;
