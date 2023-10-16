import { MultiSelect, Tags, Popover, Badge } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useState } from 'react';

import { FilterModal } from '../../../../../common/SmtRateReverts';
import { SOURCE_OPTIONS } from '../../../../../constants/rateRevertsConstants';
import { getSourceTags, getAppliedFilters } from '../../../../../helpers/getRateRevertsHeaderFunctions';

import styles from './styles.module.css';

function Header({
	setParams = () => {},
	params = {},
}) {
	const [showFilters, setShowFilters] = useState(false);

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

	const sourceTags = getSourceTags({
		sources: params?.source || [],
		filterValues,
	});

	return (
		<div className={styles.header_container}>
			<div className={styles.header}>
				Rate Reverts
			</div>

			<div className={styles.sources_container}>
				<MultiSelect
					className={styles.source_select_container}
					value={params?.source}
					placeholder="Select Source"
					options={Object.values(SOURCE_OPTIONS)}
					isClearable
					size="sm"
					prefix={null}
					onChange={(val) => setParams(
						(prev) => ({
							...(prev || {}),
							source: val,
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

				<Popover
					placement="left"
					interactive
					visible={showFilters}
					render={(
						showFilters ? (
							<FilterModal
								filterValues={filterValues}
								defaultValues={defaultValues}
								setParams={setParams}
								setShowFilters={setShowFilters}
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
