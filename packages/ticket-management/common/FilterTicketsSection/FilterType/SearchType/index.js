import { Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import { getSpectatorTypeOptions } from '../../../../constants';

import styles from './styles.module.css';

function SearchType({
	searchParams = {}, setSearchParams = () => {}, isAdmin = false, spectatorType = '', setSpectatorType = () => {},
}) {
	const { t } = useTranslation(['myTickets']);

	return (
		<div className={styles.search_container}>
			<Input
				size="sm"
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
					size="sm"
					placeholder={t('myTickets:spectator_placeholder_text')}
					value={spectatorType}
					options={getSpectatorTypeOptions({ t })}
					onChange={(val) => setSpectatorType(val)}
					isClearable
				/>
			)}
		</div>
	);
}

export default SearchType;
