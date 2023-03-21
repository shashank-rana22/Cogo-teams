import { Button } from '@cogoport/components';
import { isEmpty, startCase, upperCase } from '@cogoport/utils';

import styles from './styles.module.css';

function Details({ sop_detail = {}, setShowForm = () => {} }) {
	const mapping = {
		'BL Category'      : upperCase(sop_detail?.bl_category || ''),
		'BL Preferences'   : upperCase(sop_detail?.bl_preference || ''),
		'Mode of Delivery' : startCase(sop_detail?.preferred_mode_of_document_execution || ''),
		Name               : sop_detail?.name,
		'Contact Number'   : (sop_detail?.country_code || '') + (sop_detail?.contact_no || ''),
		Address            : sop_detail?.address,
	};

	function LabelValue({ label, value }) {
		return !isEmpty(value) ? (
			<>
				<div className={styles.label}>{label}</div>
				<div className={styles.value}>{value}</div>
			</>
		) : null;
	}

	return (
		<div className={styles.container}>
			{isEmpty(sop_detail) ? <div>No Data Available</div>
				: (
					<div>
						{Object.keys(mapping).map((key) => <LabelValue label={key} value={mapping[key]} />)}
					</div>
				)}

			<div>
				<Button
					themeType="accent"
					size="sm"
					onClick={() => setShowForm(true)}
				>
					{isEmpty(sop_detail) ? 'Add' : 'Edit'}

				</Button>
			</div>
		</div>
	);
}
export default Details;
