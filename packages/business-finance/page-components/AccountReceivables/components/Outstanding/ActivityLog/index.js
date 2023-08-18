import { Checkbox, Input, Select } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';

function ActivityLog({ formData = {}, setFormData = () => {} }) {
	return (
		<div>
			<Checkbox label="Reminder?" value="reminder" disabled={false} />
			<div className={styles.single_form_row}>
				<div className={styles.input}>
					<div className={styles.label}>Select Reminder Type</div>
					<Select
						value={formData?.reminderType || 'call'}
						options={[
							{ label: 'Call', value: 'call' },
							{ label: 'Email', value: 'email' },
							{ label: 'Meeting', value: 'meeting' },
							{ label: 'Platform Demo', value: 'platformDemo' },
						]}
						onChange={(val) => setFormData((prev) => ({ ...prev, reminderType: val }))}
					/>
				</div>

				<div className={styles.input}>
					<div className={styles.label}>Attendee from Cogoport</div>
					<Select
						value={formData?.attendee || 'hk'}
						onChange={(value) => setFormData((p) => ({ ...p, attendee: value }))}
					/>
				</div>
			</div>

			<div className={styles.single_form_row}>
				<Input size="md" placeholder="Small" />
			</div>

		</div>
	);
}

export default ActivityLog;
