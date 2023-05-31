import { isEmpty, startCase } from '@cogoport/utils';

import POC_WORKSCOPE_MAPPING from '../../../../../../contants/POC_WORKSCOPE_MAPPING';

import styles from './styles.module.css';

function Card({ data = {} }) {
	const mapping = {
		Process      : (data.processes || []).map((i) => startCase(i)).join(','),
		Name         : data.name || '',
		'Contact No' : `${data.mobile_country_code || ''} ${data.mobile_number}`,
		Email        : data.email,
		Workscope    : (data.work_scopes || []).map((i) => POC_WORKSCOPE_MAPPING[i]).join(', '),
	};

	function LabelValue({ label, value }) {
		return !isEmpty(value) ? (
			<div className={styles.label_value_container}>
				<div className={styles.label}>
					{label}
					:
				</div>
				<div className={styles.value}>{value}</div>
			</div>
		) : null;
	}

	return (
		<div className={styles.container}>
			{Object.keys(mapping).map((key) => (
				<LabelValue
					label={key}
					value={mapping[key]}
				/>
			))}
		</div>
	);
}
export default Card;
