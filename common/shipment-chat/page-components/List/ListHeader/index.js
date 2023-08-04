import { Tabs, TabPanel, Input, cl, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight, IcMUnread } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function ListHeader({
	status = '',
	setStatus = () => {},
	setFilters = () => {},
	showUnreadChat = false,
	handleClick = () => {},
}) {
	const [search, setSearch] = useState('');
	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			page : 1,
			q    : query,
		}));
	}, [query, setFilters]);

	return (
		<div>
			<div className={styles.search}>
				<Input
					value={search}
					placeholder="Search"
					onChange={(val) => setSearch(val)}
					suffix={<IcMSearchlight />}
				/>

				<Button
					className={cl` ${styles.filter_box} ${showUnreadChat ? styles.filled : ''}`}
					themeType="linkUi"
					tabIndex={0}
					onClick={() => handleClick()}
				>
					<IcMUnread />
				</Button>
			</div>

			<Tabs activeTab={status} onChange={setStatus} themeType="secondary" fullWidth>
				<TabPanel name="active" title="Active" />
				<TabPanel name="inactive" title="Inactive" />
			</Tabs>
		</div>
	);
}

export default ListHeader;
