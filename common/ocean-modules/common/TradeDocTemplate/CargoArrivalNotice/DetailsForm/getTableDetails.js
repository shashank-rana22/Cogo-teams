import { TextAreaController } from '@cogoport/forms';

import styles from './styles.module.css';
import TABLE_DETAIL_CONTROLS from './TableDetailControls';

const getTableDetails = ({ service_type, control, setValue = () => {} }) => {
	const TABLE_DETAILS = TABLE_DETAIL_CONTROLS[service_type]?.length
		? TABLE_DETAIL_CONTROLS[service_type]?.map((item) => (
			<div className={styles.last_block} key={item.name}>
				<div className={styles.last_block_text}>
					{`${item.label} :`}
				</div>

				<div className={styles.ref_text_area}>
					<TextAreaController
						control={control}
						name={item.name}
						setValue={setValue}
						rows={3}
					/>
				</div>
			</div>
		)) : [];

	return TABLE_DETAILS;
};

export default getTableDetails;
