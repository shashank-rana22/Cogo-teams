import { useForm } from '@cogoport/forms';
import React from 'react';

import FieldArray from '../../../../common/FieldArray';

import styles from './styles.module.css';

const columns = ['LIFECYCLE ITEM',
	'DIY SCORE & WARMTH DURATION',
	'ASSISTED SCORE & WARMTH DURATION',
	'SYSTEM SCORE & WARMTH DURATION', 'COGOVERSE SCORE & WARMTH DURATION', ' '];

function EngagementType(props) {
	const { value } = props;

	const formProps = useForm();

	const { control } = formProps;

	// const formValues = watch();

	const { sub_list } = value;

	return (
		<div className={styles.collapse_inner_container}>
			<div className={styles.table_header_container}>
				{columns.map((item) => (
					<div className={styles.table_headers}>
						{' '}
						{item}
					</div>

				))}
			</div>

			<hr color="#F8F2E7" />

			{sub_list.map((item) => (
				<div className={styles.sublist_item}>
					{/* {item.lifecycle_item} */}
					<FieldArray item={item} control={control} name="single_item" />

				</div>
			))}

		</div>

	);
}

export default EngagementType;
