import {
	Input,
} from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import {
	IcMSearchlight,
} from '@cogoport/icons-react';

import styles from './styles.module.css';

function TeamsHeader({
	searchValue = '',
	setSearchValue = () => {},
	setActiveTeamCard = () => {},

}) {
	const newConversation = () => {
		setActiveTeamCard({ group_id: '', is_draft: true });
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

			<img
				className={styles.edit_icon}
				src={GLOBAL_CONSTANTS.image_url.edit_square}
				alt="newConversation"
				onClick={newConversation}
				width={20}
				height={20}
				aria-hidden
			/>

			{/* <Image
				className={styles.edit_icon}
				width={20}
				height={20}
				alt="new"
				src={GLOBAL_CONSTANTS.image_url.edit_square}
				onClick={newConversation}
			/> */}
		</div>
	);
}

export default TeamsHeader;
