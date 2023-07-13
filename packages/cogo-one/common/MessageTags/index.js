import { Pill } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

function MessageTags({ tags = [] }) {
	return (
		<div className={styles.tags_flex}>
			{tags?.map((eachTag) => (
				<Pill
					eachTag={eachTag?.value}
					key={eachTag}
					size="md"
					color="#fef199"
					className={styles.each_tag}
				>
					{`${startCase(eachTag?.name)}- ${eachTag?.value}`}
				</Pill>
			))}
		</div>
	);
}
export default MessageTags;
