import { Input, Select } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import { SPECTATOR_TYPE_OPTIONS } from '../../../../constants';

import styles from './styles.module.css';

function SearchType({
	searchParams = {}, setSearchParams = () => {}, isAdmin = false, spectatorType = '', setSpectatorType = () => {},
}) {
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
				placeholder="Search here..."
				value={searchParams.text}
				onChange={(val) => setSearchParams((prev) => ({
					...prev,
					text: val,
				}))}
			/>
			{!isAdmin &&	(
				<Select
					size="sm"
					placeholder="Select view"
					value={spectatorType}
					options={SPECTATOR_TYPE_OPTIONS}
					onChange={(val) => setSpectatorType(val)}
					isClearable
				/>
			)}
		</div>
	);
}

export default SearchType;
