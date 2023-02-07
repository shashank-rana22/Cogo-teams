import { Input } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';
import React from 'react';

import Filters from './Filters';
import styles from './styles.module.css';

function Header() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Ground Ops Dashboard</div>
			<div className={styles.filters_container}>
				<Filters />
				<Input
					suffix={<IcMSearchlight className="search_icon" />}
					className={styles.input_search}
					style={{ width: '260px', height: '26px' }}
					placeholder="Search"
					type="text"
				/>
			</div>
		</div>
	);
}

export default Header;
