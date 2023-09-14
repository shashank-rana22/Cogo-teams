import { Button } from '@cogoport/components';
import { InputController, MobileNumberController } from '@cogoport/forms';
import { IcMEdit } from '@cogoport/icons-react';

import styles from './styles.module.css';

function getColumns({
	selectedUserId = '',
	buttonLoading = false,
	setSelectedUserId = () => {},
	control = {},
	handleSubmit = () => {},
	onUpdateLeadUser = () => {},
	createLeadOrgAccount = () => { },
}) {
	const columns = [
		{
			id       : 'contact_name',
			Header   : 'Name',
			accessor : (item) => (
				selectedUserId === item?.id ? (
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
				selectedUserId === item?.id ? (
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
				selectedUserId === item?.id
					? (
						<MobileNumberController
							size="sm"
							name="mobile_number"
							control={control}
							value={{
								number       : item?.mobile_number,
								country_code : item?.mobile_country_code,
							}}
							placeholder="Enter Mobile Number"
						/>
					) : `${item?.mobile_country_code} ${item?.mobile_number}`
			),
		},
		{
			id       : 'edit',
			Header   : '',
			accessor : (item) => (
				<div className={styles.action_container}>
					{selectedUserId === item?.id
						? (
							<>
								<Button
									themeType="tertiary"
									onClick={() => setSelectedUserId('')}
								>
									Cancel
								</Button>

								<Button
									themeType="secondary"
									onClick={handleSubmit(onUpdateLeadUser)}
								>
									Save
								</Button>
							</>
						) : (
							<>
								<Button
									themeType="secondary"
									disabled={buttonLoading}
									onClick={() => { setSelectedUserId(item?.id); }}
								>
									<IcMEdit className={styles.icon} />
									Edit
								</Button>

								{!selectedUserId ? (
									<Button
										loading={buttonLoading}
										disabled={buttonLoading}
										onClick={() => createLeadOrgAccount({ selectedPocId: item?.id })}
									>
										Choose and Verify
									</Button>
								) : null}
							</>
						)}
				</div>
			),
		},
	];
	return columns;
}

export default getColumns;
