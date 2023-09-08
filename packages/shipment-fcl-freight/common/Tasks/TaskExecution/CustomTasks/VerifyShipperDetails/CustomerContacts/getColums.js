import { Button, Checkbox } from '@cogoport/components';
import { InputController } from '@cogoport/forms';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function getColumns({ isEditMode = false, setIsEditMode = () => {}, control = {} }) {
	const columns = [
		{
			id       : 'select_contacts',
			Header   : 'Select',
			accessor : (item) => (
				<div>
					<Checkbox disabled={isEditMode === item?.index} />
				</div>

			),
		},
		{
			id       : 'contact_name',
			Header   : 'Name',
			accessor : (item) => (
				isEditMode === item?.index
					? (
						<InputController
							size="sm"
							name="name"
							control={control}
							value={item?.name}
							placeholder="Enter Name"
							// rules={{}}
						/>
					) : (
						<div>{item?.name}</div>
					)
			),
		},
		{
			id       : 'contact_email',
			Header   : 'Email',
			accessor : (item) => (
				isEditMode === item?.index
					? (
						<InputController
							size="sm"
							name="email"
							control={control}
							value={item?.email}
							placeholder="Enter Email Address"
							// rules={{}}
						/>
					)
					: (
						<div>{item?.email}</div>
					)
			),
		},
		{
			id       : 'contact_number',
			Header   : 'Mobile Number',
			accessor : (item) => (
				isEditMode === item?.index
					? (
						<InputController
							size="sm"
							name="mobile_number"
							control={control}
							value={item?.mobile_number}
							placeholder="Enter Mobile Number"
						/>
					) : (
						<div>{`${item?.mobile_country_code} ${item?.mobile_number}`}</div>
					)
			),
		},
		{
			id       : 'edit',
			Header   : '',
			accessor : (item) => (
				<div className={styles.button_container}>
					{isEditMode === item?.index
						? (
							<>
								<Button themeType="secondary">Save</Button>

								<Button themeType="tertiary" onClick={() => setIsEditMode(null)}>Cancel</Button>
							</>
						) : (
							<Button
								themeType="tertiary"
								onClick={() => { setIsEditMode(item?.index); }}
							>
								<IcMEdit />

							</Button>
						)}
				</div>
			),
		},
	];
	return columns;
}

export default getColumns;
