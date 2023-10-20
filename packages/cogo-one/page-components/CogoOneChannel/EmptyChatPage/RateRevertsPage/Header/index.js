import { MultiSelect, Tags, Popover, Badge, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import React, { useState, useMemo } from 'react';

import { FilterModal } from '../../../../../common/SmtRateReverts';
import { SOURCE_OPTIONS } from '../../../../../constants/rateRevertsConstants';
import { getSourceTags, getAppliedFilters } from '../../../../../helpers/getRateRevertsHeaderFunctions';

import styles from './styles.module.css';

function Header({
	setParams = () => {},
	params = {},
	stats = {},
	searchQuery = '',
	setSearchQuery = () => {},
}) {
	const { query: { partner_id = '' } = {} } = useRouter();
	const [showFilters, setShowFilters] = useState(false);
	const [shipmentObj, setShipmentObj] = useState({});

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
	} = getAppliedFilters({ params });

	const { dynamic_statistics = {} } = stats || {};

	const sourceTags = getSourceTags({
		sources           : params?.source || [],
		filterValues,
		dynamicStatistics : dynamic_statistics,
		shipmentObj,
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
						`${window.location.origin}/${partner_id}/supply/dashboards/rate-density`,
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
					onChange={(val) => setParams(
						(prev) => ({
							...(prev || {}),
							source : val,
							page   : 1,
						}),
					)}
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
								setShipmentObj={setShipmentObj}
							/>
						) : null
					)}
				>
					{isFiltersApplied ? (
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
