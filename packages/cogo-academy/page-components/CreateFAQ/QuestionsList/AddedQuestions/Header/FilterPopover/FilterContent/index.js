/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { MultiselectController, useForm } from '@cogoport/forms';

import styles from './styles.module.css';

function FilterContent({ topicOptions, tagOptions }) {
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
