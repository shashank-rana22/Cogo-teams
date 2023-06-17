// import { Select } from '@cogoport/components';
// import { SelectController } from '@cogoport/forms';
import { IcMPlusInCircle } from '@cogoport/icons-react';

import styles from './styles.module.css';

function AddGroupMember() {
	// const
	return (
		<div>
			<div className={styles.conversation_title}>Add Group Member</div>
			{/* <SelectController
				optionsListKey="partner-user"
			/> */}
			<IcMPlusInCircle />
		</div>
	);
}

export default AddGroupMember;
