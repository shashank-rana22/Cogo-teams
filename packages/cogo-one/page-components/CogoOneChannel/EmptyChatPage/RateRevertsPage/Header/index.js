import { MultiSelect, Tags, Popover, Badge, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';

import { FilterModal } from '../../../../../common/SmtRateReverts';
import { SOURCE_OPTIONS } from '../../../../../constants/rateRevertsConstants';
import defaultRatesLocalStorageValue from '../../../../../helpers/defaultRatesLocalStorageValue';
import { getSourceTags, getAppliedFilters } from '../../../../../helpers/getRateRevertsHeaderFunctions';

import styles from './styles.module.css';

function Header({
	setParams = () => {},
	params = {},
	stats = {},
	searchQuery = '',
	setSearchQuery = () => {},
	viewType = '',
}) {
	const { query: { partner_id = '' } = {} } = useRouter();
	const [showFilters, setShowFilters] = useState(false);
	const [filtersData, setFiltersData] = useState({});

	const handleItemsChange = (val) => setParams(
		(prev) => ({
			...(prev || {}),
			source: val.map((itm) => itm?.key),
		}),
	);

	const {
		isFiltersApplied = false,
		filterValues = {},
		defaultValues = {},
	} = getAppliedFilters({ params, viewType });

	const { dynamic_statistics = {} } = stats || {};

	const { localStorageFilterValue } = defaultRatesLocalStorageValue();

	const sourceTags = getSourceTags({
		sources           : params?.source || [],
		filterValues,
		dynamicStatistics : dynamic_statistics,
		viewType,
		filtersData,
	});

	const sourceOptions = useMemo(
		() => {
			if (isEmpty(dynamic_statistics)) {
				return Object.values(SOURCE_OPTIONS);
			}

			return Object.values(SOURCE_OPTIONS).reduce(
				(acc, itm) => (
					[...acc,
						{
							...itm,
							label: `${itm?.label} (${dynamic_statistics?.[itm?.value] || 0})`,
						}]
				),
				[],
			);
		},
		[dynamic_statistics],
	);

	return (
		<div className={styles.header_container}>
			<div
				className={styles.header}
				role="presentation"
				onClick={(e) => {
					e.stopPropagation();
					window.open(
						`${window.location.origin}/v2/${partner_id}/supply/dashboards/rate-density`,
						'_blank',
					);
				}}
			>
				Rate Jobs
			</div>

			<div className={styles.sources_container}>
				<MultiSelect
					className={styles.source_select_container}
					value={params?.source}
					placeholder="Select Source"
					options={sourceOptions}
					isClearable
					size="sm"
					prefix={() => null}
					onChange={(val) => {
						localStorage.setItem('smt_rate_data_source', JSON.stringify({
							source: val,
						}));
						setParams(
							(prev) => ({
								...(prev || {}),
								source : val,
								page   : 1,
							}),
						);
					}}
				/>

				<div className={styles.selected_sources}>
					<Tags
						items={sourceTags}
						onItemsChange={handleItemsChange}
						size="md"
					/>
				</div>

				<Input
					size="sm"
					value={searchQuery}
					onChange={setSearchQuery}
					className={styles.tid_search_input}
					placeholder="Search Job ID"
					prefix={(
						<IcMSearchlight
							height={20}
							width={20}
							fill="#9f9f9f"
						/>
					)}
				/>

				<Popover
					placement="left"
					interactive
					visible={showFilters}
					onClickOutside={() => setShowFilters(false)}
					render={(
						showFilters ? (
							<FilterModal
								filterValues={filterValues}
								defaultValues={defaultValues}
								setParams={setParams}
								setShowFilters={setShowFilters}
								viewType={viewType}
								setFiltersData={setFiltersData}
							/>
						) : null
					)}
				>
					{localStorageFilterValue?.filterApplied || isFiltersApplied ? (
						<Badge color="orange">
							<IcMFilter
								className={styles.filter_icon}
								onClick={() => setShowFilters((prev) => !prev)}
							/>
						</Badge>
					) : (
						<IcMFilter
							className={styles.filter_icon}
							onClick={() => setShowFilters((prev) => !prev)}
						/>
					)}
				</Popover>
			</div>
		</div>
	);
}

export default Header;
