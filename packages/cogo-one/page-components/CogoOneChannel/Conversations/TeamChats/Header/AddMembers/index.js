// import { useForm, MultiSelectController } from '@cogoport/forms';
import React from 'react';

import styles from './styles.module.css';

function AddMembers() {
	// const { handleSubmit, control } = useForm();

	return (
		<div className={styles.styles}>
			<div>
				Add people
			</div>

			{/* <MultiSelectController
				control={control}
				placeholder="Enter a name or email"
				// options={options}
				isClearable
				name="new_members"
				style={{ width: '250px' }}
			/> */}
		</div>
	);
}

export default AddMembers;
