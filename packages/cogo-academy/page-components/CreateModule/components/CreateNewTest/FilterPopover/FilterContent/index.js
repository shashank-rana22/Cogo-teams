/* eslint-disable max-len */
import { Button } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';

import styles from './styles.module.css';

function FilterContent({
	control,
	handleSubmit,
	onSubmit,
	onClickReset,
}) {
	const params = {
		filters: {
			entity_types : ['cogoport'],
			status       : 'active',
		},
		page_limit: 10,
	};

	return (
		<form className={styles.filter_container} onSubmit={handleSubmit(onSubmit)}>

			<div>
				<div className={styles.title}> Filter By Cogo Entity</div>

				<AsyncSelectController
					name="cogo_entity_id"
					control={control}
					asyncKey="partners"
					params={params}
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
