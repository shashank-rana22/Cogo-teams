import {
	Input,
	Popover,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMFilter,
	IcMSearchlight,
} from '@cogoport/icons-react';
import { Image } from '@cogoport/next';
import { useState } from 'react';

import styles from './styles.module.css';

function TeamsHeader({
	searchValue = '',
	setSearchValue = () => {},
	setActiveTeamCard = () => {},

}) {
	const [filterVisible, setFilterVisible] = useState(false);

	const newConversation = () => {
		setActiveTeamCard({ group_id: '', group_members_count: 0 });
	};

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
			<div className={styles.styled_popover}>
				<Popover
					placement="right"
					render="will be add"
					visible={filterVisible}
				>
					<IcMFilter
						onClick={() => setFilterVisible((prev) => !prev)}
						className={styles.filter_icon}
					/>
				</Popover>
			</div>
			<Image
				className={styles.edit_icon}
				width={20}
				height={20}
				src={GLOBAL_CONSTANTS.image_url.edit_square}
				onClick={newConversation}
			/>
		</div>
	);
}

export default TeamsHeader;
