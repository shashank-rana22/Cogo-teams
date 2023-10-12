import { MultiSelect, Badge, Tags } from '@cogoport/components';
import { IcMFilter } from '@cogoport/icons-react';
import React, { useMemo } from 'react';

import { SOURCE_OPTIONS } from '../../../../../constants/rateRevertsConstants';

import getSourceTags from './getSourceTags';
import styles from './styles.module.css';

function Header({ setParams = () => {}, params = {}, setShowFilters = () => {} }) {
	const sourceTags = useMemo(
		() => getSourceTags({ sources: params?.source || [] }),
		[params?.source],
	);

	const handleItemsChange = (val) => setParams(
		(prev) => ({
			...(prev || {}),
			source: val.map((itm) => itm?.key),
		}),
	);

	return (
		<>
			<div className={styles.header}>
				Rate Reverts
			</div>

			<div className={styles.sources_container}>
				<MultiSelect
					className={styles.source_select_container}
					value={params?.source}
					onChange={(val) => setParams((prev) => ({ ...(prev || {}), source: val }))}
					placeholder="Select Source"
					options={Object.values(SOURCE_OPTIONS)}
					isClearable
					size="sm"
					prefix={null}
				/>

				<div className={styles.selected_sources}>
					<Tags
						items={sourceTags}
						onItemsChange={handleItemsChange}
						size="md"
					/>
				</div>

				<Badge color="orange">
					<IcMFilter
						className={styles.filter_icon}
						onClick={() => setShowFilters(true)}
					/>
				</Badge>
			</div>
		</>
	);
}

export default Header;
