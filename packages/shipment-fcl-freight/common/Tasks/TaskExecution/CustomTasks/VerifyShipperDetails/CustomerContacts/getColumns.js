import { Button, Checkbox } from '@cogoport/components';
import { InputController, MobileNumberController } from '@cogoport/forms';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function getColumns({
	isEditMode = false,
	setIsEditMode = () => {},
	control = {},
	setCheckList = () => {},
	handleSubmit = () => {},
	onUpdateLeadUser = () => {},
}) {
	const columns = [
		{
			id       : 'select_contacts',
			Header   : 'Select',
			accessor : (item) => (
				<Checkbox
					disabled={isEditMode === item?.id}
					onChange={(event) => {
						setCheckList(() => {
							if (event?.target?.checked) {
								return item?.id;
							}
							return null;
						});
					}}
				/>
			),
		},
		{
			id       : 'contact_name',
			Header   : 'Name',
			accessor : (item) => (
				isEditMode === item?.id ? (
					<InputController
						size="sm"
						name="name"
						control={control}
						value={item?.name}
						placeholder="Enter Name"
					/>
				) : item?.name
			),
		},
		{
			id       : 'contact_email',
			Header   : 'Email',
			accessor : (item) => (
				isEditMode === item?.id ? (
					<InputController
						size="sm"
						name="email"
						control={control}
						value={item?.email}
						placeholder="Enter Email Address"
					/>
				) : item?.email
			),
		},
		{
			id       : 'contact_number',
			Header   : 'Mobile Number',
			accessor : (item) => (
				isEditMode === item?.id
					? (
						<MobileNumberController
							size="sm"
							name="mobile_number"
							control={control}
							value={item?.mobile_number}
							placeholder="Enter Mobile Number"
						/>
					) : `${item?.mobile_country_code} ${item?.mobile_number}`
			),
		},
		{
			id       : 'edit',
			Header   : '',
			accessor : (item) => (
				<div className={styles.button_container}>
					{isEditMode === item?.id
						? (
							<>
								<Button
									themeType="secondary"
									onClick={() => { handleSubmit(onUpdateLeadUser); }}
								>
									Save
								</Button>

								<Button
									themeType="tertiary"
									onClick={() => setIsEditMode(null)}
								>
									Cancel
								</Button>
							</>
						) : (
							<Button
								themeType="tertiary"
								onClick={() => { setIsEditMode(item?.id); }}
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
