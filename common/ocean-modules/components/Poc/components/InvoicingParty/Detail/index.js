import { isEmpty } from '@cogoport/utils';

import styles from './styles.module.css';

function Detail({ data = [] }) {
	const mapping = (poc = {}) => ({
		Name         : poc.name || '',
		'Contact No' : `${poc.mobile_country_code || ''} ${poc.mobile_number}`,
		Email        : poc.email || '',
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
			{ data.map((poc) => {
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
