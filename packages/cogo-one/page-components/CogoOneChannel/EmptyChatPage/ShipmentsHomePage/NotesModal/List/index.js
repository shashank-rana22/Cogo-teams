import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import EachNote from './EachNote';
import styles from './styles.module.css';

function List({
	loading = false,
	notesData = [],
}) {
	if (loading) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.cogo_one_loader}
					alt="load"
					width={100}
					height={100}
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{[...(notesData || [])].reverse()?.map((note) => <EachNote note={note} key={note?.id} />)}
		</div>
	);
}

export default List;
