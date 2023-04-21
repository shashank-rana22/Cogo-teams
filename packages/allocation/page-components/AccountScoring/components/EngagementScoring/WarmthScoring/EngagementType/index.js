import { useForm } from '@cogoport/forms';

import FieldArray from '../../../../common/FieldArray';

import styles from './styles.module.css';

const columns = ['LIFECYCLE ITEM',
	'DIY SCORE & WARMTH DURATION',
	'ASSISTED SCORE & WARMTH DURATION',
	'SYSTEM SCORE & WARMTH DURATION', 'COGOVERSE SCORE & WARMTH DURATION'];

function EngagementType(props) {
	const { value } = props;

	const { sub_list } = value;

	const formProps = useForm({ defaultValues: { single_item: sub_list } });

	const { control } = formProps;

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

			<div className={styles.sublist_item}>
				<FieldArray control={control} name="single_item" />
			</div>
		</div>
	);
}

export default EngagementType;
