/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { MultiselectController, useForm } from '@cogoport/forms';

import styles from './styles.module.css';

export const topicOptions = [
	{ label: 'Topic 1', value: 'topic1' },
	{ label: 'Topic 2', value: 'topic2' },
	{ label: 'Topic 3', value: 'topic3' },
	{ label: 'Topic 4', value: 'topic4' },
];

export const tagOptions = [
	{ label: 'Tag 1', value: 'tag1' },
	{ label: 'Tag 2', value: 'tag2' },
	{ label: 'Tag 3', value: 'tag3' },
	{ label: 'Tag 4', value: 'tag4' },
];

function FilterContent() {
	const { control } = useForm();

	return (
		<div className={styles.filter_container}>
			<div>
				<div className={styles.title}> Filter By Topics</div>
				<MultiselectController
					name="topic"
					control={control}
					options={topicOptions}
				/>

			</div>

			<div>
				<div className={styles.title}> Filter By Tags</div>

				<MultiselectController
					name="tag"
					control={control}
					options={tagOptions}
				/>

			</div>

			<div className={styles.button_container}>
				<Button themeType="secondary" style={{ marginRight: '8px' }}>
					Reset
				</Button>

				<Button>
					Apply
				</Button>
			</div>
		</div>
	);
}

export default FilterContent;
