import { isEmpty } from '@cogoport/utils';

import POC_WORKSCOPE_MAPPING from '../../../../../contants/POC_WORKSCOPE_MAPPING';

import styles from './styles.module.css';

function Detail({ data = [], sp_key = '' }) {
	const sp_poc = data?.filter((i) => i.organization_id === sp_key);

	const mapping = (poc = {}) => ({
		Name         : poc.name || '',
		'Contact No' : `${poc.mobile_country_code || ''} ${poc.mobile_number}`,
		Email        : poc.email || '',
		Workscope    : (poc.work_scopes || []).map((i) => POC_WORKSCOPE_MAPPING[i]).join(', '),

	});

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
			{ sp_poc.map((poc) => {
				const sp_poc_data = mapping(poc);
				return (
					<div className={styles.detail_card}>
						{Object.keys(sp_poc_data).map((key) => <LabelValue label={key} value={sp_poc_data[key]} />)}
					</div>
				);
			})}
		</div>
	);
}

export default Detail;
