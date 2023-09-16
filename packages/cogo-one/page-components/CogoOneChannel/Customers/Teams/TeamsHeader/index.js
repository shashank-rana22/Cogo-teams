import { Popover, Input } from '@cogoport/components';
import { IcMFilter, IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';

function TeamsHeader({
	searchValue = '',
	setSearchValue = () => {},
	filterVisible = false,
	setFilterVisible = () => {},
}) {
	return (
		<div className={styles.header_container}>
			<div className={styles.search_field}>
				<Input
					size="sm"
					prefix={<IcMSearchlight width={18} height={18} />}
					placeholder="Search here..."
					value={searchValue}
					onChange={setSearchValue}
					arrow={false}
				/>
			</div>
			<Popover
				placement="right"
				render="will be add"
				className={styles.styled_popover}
				visible={filterVisible}
			>
				<IcMFilter
					onClick={() => setFilterVisible((prev) => !prev)}
					className={styles.filter_icon}
				/>
			</Popover>
		</div>
	);
}

export default TeamsHeader;
