import { Button, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import React, { useState } from 'react';

import styles from './styles.module.css';
import TeamsHeader from './TeamsHeader';

function Teams() {
	const [searchValue, setSearchValue] = useState('');
	const [filterVisible, setFilterVisible] = useState({
		filters: false,
	});
	// const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<TeamsHeader
				searchValue={searchValue}
				setSearchValue={setSearchValue}
				filterVisible={filterVisible}
				setFilterVisible={setFilterVisible}
			/>
			<Button size="md" themeType="tertiary">
				<Image
					src={GLOBAL_CONSTANTS.image_url.groups}
					alt="cogo_one_logo"
					width={28}
					height={22}
				/>
				<div className={styles.text}>
					Create or Join A Team
				</div>
				<Pill size="sm" color="#FFD761">New</Pill>
			</Button>
		</div>

	);
}

export default Teams;
