import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';

import EachNote from './EachNote';
import styles from './styles.module.css';

function List({
	loading = false,
	notesData = [],
	controlType = '',
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

	if (isEmpty(notesData)) {
		return (
			<div className={styles.loader}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_notes}
					alt="load"
					width={150}
					height={150}
				/>
				<div className={styles.empty_text}>No Notes Found</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{[...(notesData || [])].reverse()?.map((note) => (
				<EachNote
					note={note}
					key={note?.id}
					controlType={controlType}
				/>
			))}
		</div>
	);
}

export default List;
