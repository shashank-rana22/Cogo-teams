import { Input, Select } from '@cogoport/components';
import { IcMDescendingSort, IcMSearchlight } from '@cogoport/icons-react';
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
	sortBy = '',
}) {
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

			<Select
				size="sm"
				value={sortBy}
				onChange={setSortBy}
				placeholder="Sort by"
				className={styles.sort_by}
				options={sortByOptions({ t })}
				isClearable
				prefix={<IcMDescendingSort />}
			/>

		</div>
	);
}

export default SearchType;
