import { Button } from '@cogoport/components';
import { AsyncSelectController } from '@cogoport/forms';

import styles from './styles.module.css';

function FilterContent({
	control,
	handleSubmit,
	onSubmit,
	onClickReset,
}) {
	return (
		<form className={styles.filter_container} onSubmit={handleSubmit(onSubmit)}>

			<div>
				<div className={styles.title}> Filter By Cogo Entity</div>

				<AsyncSelectController
					name="cogo_entity_id"
					control={control}
					asyncKey="partners"
					params={{
						filters: {
							entity_types : ['cogoport'],
							status       : 'active',
						},
						page_limit: 10,
					}}
				/>
			</div>

			<div className={styles.button_container}>
				<Button
					type="button"
					themeType="secondary"
					style={{ marginRight: '8px' }}
					onClick={onClickReset}
					size="sm"
				>
					Reset
				</Button>

				<Button
					size="sm"
					themeType="primary"
					type="submit"
				>
					Apply
				</Button>
			</div>
		</form>
	);
}

export default FilterContent;
