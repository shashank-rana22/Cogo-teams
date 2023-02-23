/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { MultiselectController } from '@cogoport/forms';

import styles from './styles.module.css';

function FilterContent({
	topicOptions,
	tagOptions,
	control,
	handleSubmit,
	onSubmit,
	onClickReset,
}) {
	return (
		<form className={styles.filter_container} onSubmit={handleSubmit(onSubmit)}>
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
				<Button
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={onClickReset}
				>
					Reset
				</Button>

				<Button themeType="primary" type="submit">
					Apply
				</Button>
			</div>
		</form>
	);
}

export default FilterContent;
