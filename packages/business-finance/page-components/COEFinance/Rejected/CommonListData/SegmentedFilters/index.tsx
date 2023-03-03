import { Input } from '@cogoport/components';
import { IcMSearchdark } from '@cogoport/icons-react';
import React from 'react';

import Filter from '../../../../commons/Filters';
import { GenericObject } from '../../../../commons/Interfaces/index';
import FilterModal from '../../../Components/FilterModal/index';

import controls from './controls';
import styled from './styles.module.css';

interface SegmentFilterProps {
	setSearchValue: any;
	searchValue: string;
	filters: GenericObject;
	setFilters: (p: object) => void;
}

function SegmentedFilters({

	setSearchValue,
	searchValue,
	filters,
	setFilters,
}: SegmentFilterProps) {
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
			</div>

			<div className={styled.search_filter}>
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
