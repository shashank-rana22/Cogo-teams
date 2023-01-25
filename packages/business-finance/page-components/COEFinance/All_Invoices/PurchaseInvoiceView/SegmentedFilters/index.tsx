import { Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React, { useState } from 'react';

import Filter from '../../../../commons/Filters';
import { GenericObject } from '../../../../commons/Interfaces/index';
import SegmentedControl from '../../../../commons/SegmentedControl/index';
import FilterModal from '../../../Components/FilterModal/index';
import FILTERS_DATA from '../../../constants/purchase-list-filters';
import FILTERS_URGENT_DATA from '../../../constants/purchase-list-segments';
import usePurchaseViewStats from '../../../hook/getPurchaseViewStats';

import controls from './controls';
import styled from './styles.module.css';

interface segmentFilterProps {
	setSearchValue: any;
	searchValue: string;
	currentTab: string;
	setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
	filters: GenericObject;
	setFilters: (p: object) => void;
}

function SegmentedFilters({
	setCurrentTab,
	currentTab,
	setSearchValue,
	searchValue,
	filters,
	setFilters,
}: segmentFilterProps) {
	const { statsData }: any = usePurchaseViewStats();

	return (
		<div className={styled.main}>
			<div className={styled.segment}>
				<div className={styled.filterData}>
					<SegmentedControl
						options={FILTERS_DATA(statsData)}
						activeTab={currentTab}
						setActiveTab={setCurrentTab}
						color="#ED3726"
						background="#FFFAEB"
					/>
				</div>

				<div className={styled.filterDataUrgent}>
					<SegmentedControl
						options={FILTERS_URGENT_DATA(statsData)}
						activeTab={currentTab}
						setActiveTab={setCurrentTab}
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
			</div>

			<div className={styled.searchFilter}>
				<div className={styled.search}>
					<Input
						name="q"
						size="sm"
						value={searchValue}
						onChange={(e: any) => setSearchValue(e)}
						placeholder="Search by Invoice No./Shipment ID/Supplier name..."
						suffix={(
							<div style={{ margin: '4px', display: 'flex' }}>
								<IcMSearchdark height={15} width={15} />
							</div>
						)}
					/>
				</div>

				<FilterModal setFilters={setFilters} filters={filters} />
			</div>
		</div>
	);
}

export default SegmentedFilters;
