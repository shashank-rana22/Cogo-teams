import { Tabs, TabPanel, Input, cl, Button } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { IcMSearchlight, IcMUnread } from '@cogoport/icons-react';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

const TAB_MAPPING = [
	{
		label : 'Recent',
		name  : 'recent',
	},
	{
		label : 'Active',
		name  : 'active',
	},
	{
		label : 'Inactive',
		name  : 'inactive',
	},
];

function ListHeader({
	status = '',
	setStatus = () => {},
	setFilters = () => {},
	showUnreadChat = false,
	handleClick = () => {},
	shipment_data = {},
}) {
	const [search, setSearch] = useState(shipment_data?.serial_id || '');
	const { query, debounceQuery } = useDebounceQuery();

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		setSearch(shipment_data?.serial_id || '');
	}, [shipment_data?.serial_id, status]);

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
					onClick={() => handleClick()}
				>
					<IcMUnread />
				</Button>
			</div>

			<Tabs activeTab={status} onChange={setStatus} themeType="secondary" fullWidth>
				{(TAB_MAPPING || []).map((item) => {
					const { name = '', label = '' } = item;

					return <TabPanel key={name} name={name} title={label} />;
				})}
			</Tabs>
		</div>
	);
}

export default ListHeader;
