import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Details({ data = [] }) {
	const { sop_detail = {} } = data[0] || {};

	const mapping = {
		'BL Category'      : upperCase(sop_detail.bl_category || ''),
		'BL Preferences'   : upperCase(sop_detail.bl_preference || ''),
		'Mode of Delivery' : startCase(sop_detail.preferred_mode_of_document_execution || ''),
		Name               : sop_detail.name,
		'Contact Number'   : (sop_detail.country_code || '') + (sop_detail.contact_no || ''),
		Address            : sop_detail.address,
	};

	function LabelValue({ label, value }) {
		return !isEmpty(value) ? (
			<div className={styles.detail}>
				<div className={styles.label}>{label}</div>
				<div>{value}</div>
			</div>
		) : null;
	}

	return (
		<div>
			{Object.keys(mapping).map((key) => <LabelValue label={key} value={mapping[key]} />)}
		</div>
	);
}
export default Details;
