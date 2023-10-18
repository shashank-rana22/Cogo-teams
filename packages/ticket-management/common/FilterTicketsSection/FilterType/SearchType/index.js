import { Input, Select, cl } from '@cogoport/components';
import { IcMArrowRotateDown, IcMArrowRotateUp, IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import { sortByOptions, getSpectatorTypeOptions } from '../../../../constants';

import styles from './styles.module.css';

function SearchType({
	setSpectatorType = () => {},
	setSearchParams = () => {},
	setSortBy = () => {},
	spectatorType = '',
	searchParams = {},
	isAdmin = false,
	sortBy = {},
}) {
	const { sortOrder = '', sortType = '' } = sortBy || {};

	const { t } = useTranslation(['myTickets']);

	return (
		<div className={styles.search_container}>
			<Input
				size="sm"
				className={styles.global_search}
				prefix={(
					<IcMSearchlight
						width={16}
						height={16}
						className={styles.search_icon}
					/>
				)}
				placeholder={t('myTickets:search_placeholder_text')}
				value={searchParams.text}
				onChange={(val) => setSearchParams((prev) => ({
					...prev,
					text: val,
				}))}
			/>

			{!isAdmin && (
				<Select
					className={styles.spectator_type}
					size="sm"
					placeholder={t('myTickets:spectator_placeholder_text')}
					value={spectatorType}
					options={getSpectatorTypeOptions({ t })}
					onChange={(val) => setSpectatorType(val)}
					isClearable
				/>
			)}

			<div className={styles.sort_section}>
				<Select
					size="sm"
					value={sortType}
					onChange={(val) => setSortBy((prev) => ({ ...prev, sortType: val }))}
					placeholder="Sort by"
					className={styles.sort_by}
					options={sortByOptions({ t })}
					isClearable
				/>

				<div
					role="presentation"
					className={styles.sort_arrow_section}
					onClick={() => setSortBy((prev) => ({ ...prev, sortOrder: sortOrder === 'desc' ? 'asc' : 'desc' }))}
				>
					<IcMArrowRotateUp
						className={cl`${styles.ascend_arrow} ${sortOrder === 'asc' ? styles.disable : ''}`}
					/>
					<IcMArrowRotateDown
						className={cl`${styles.arrow_icon} ${sortOrder === 'desc' ? styles.disable : ''}`}
					/>
				</div>
			</div>
		</div>
	);
}

export default SearchType;
