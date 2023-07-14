import { Tabs, TabPanel, Input, cl } from '@cogoport/components';
import { IcMSearchlight, IcMUnread } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function ListHeader({
	status = '',
	setStatus = () => {},
	filters = {},
	setFilters = () => {},
	showUnreadChat,
	handleClick = () => {},
}) {
	return (
		<div>
			<div className={styles.container}>

				<div className={styles.tabs_container}>
					<Tabs activeTab={status} onChange={setStatus}>
						<TabPanel name="active" title="Active" />
						<TabPanel name="inactive" title="Inactive" />
					</Tabs>
				</div>

			</div>

			<div className={styles.search}>
				<Input
					value={filters?.q}
					placeholder="Search"
					onChange={(e) => setFilters({
						...(filters || {}),
						q: e,
					})}
					suffix={<IcMSearchlight />}
				/>

				<div
					className={cl` ${styles.filter_box} ${showUnreadChat ? styles.filled : ''}`}
					role="button"
					tabIndex={0}
					onClick={() => handleClick()}
				>
					<IcMUnread />
				</div>
			</div>
		</div>
	);
}

export default ListHeader;
