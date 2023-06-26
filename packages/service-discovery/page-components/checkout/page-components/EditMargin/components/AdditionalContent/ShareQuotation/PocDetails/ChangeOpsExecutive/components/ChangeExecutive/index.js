import { Button, Input, Loader, RadioGroup } from '@cogoport/components';
import { IcMSearchlight } from '@cogoport/icons-react';

import styles from './styles.module.css';
import useHandleChangeExecutive from './useHandleChangeExecutive';

function ChangeExecutive({
	loading,
	onUpdate,
	data,
	user_id,
	branch_id,
	isChannelPartner,
	setAddExecutive,
	setShowEditContact,
}) {
	const {
		setSelectedUser,
		selectedUser,
		searchValue,
		handleChange,
		usersLoading,
		onCreate,
		options,
	} = useHandleChangeExecutive({
		onUpdate,
		user_id,
		branch_id,
		isChannelPartner,
		data,
		setShowEditContact,
	});

	return (
		<>
			<div className={styles.main_container}>
				{data.id ? (
					<div className={styles.container}>
						<div className={styles.header}>Current Operations Executive</div>

						<div className={styles.content}>
							<div className={styles.sub_container}>
								<div className={styles.label_text}>Name :</div>
								<div className={styles.value_text}>{data.name}</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>Mobile Number :</div>
								<div className={styles.value_text}>
									{data.mobile_number
										? `${data.mobile_country_code} ${data.mobile_number}`
										: '-'}
								</div>
							</div>

							<div className={styles.sub_container}>
								<div className={styles.label_text}>Email :</div>
								<div className={styles.value_text}>{data.email}</div>
							</div>
						</div>
					</div>
				) : null}

				<div className={styles.heading}> Select user from the list below</div>

				<div className={styles.actions_container}>
					<div className={styles.search_by_name_email_input_container}>
						<Input
							value={searchValue}
							onChange={(val) => handleChange(val)}
							placeholder="Search by name/email"
							prefix={<IcMSearchlight style={{ marginTop: '6px' }} />}
							type="text"
						/>
					</div>

					<div className={styles.add_new_user_button_container}>
						<Button
							type="button"
							onClick={() => setAddExecutive(true)}
							style={{ height: '100%' }}
						>
							+ Add New User
						</Button>
					</div>
				</div>

				<div className={styles.layout_container}>
					{usersLoading ? (
						<div className={styles.spinner_container}>
							<Loader />
						</div>
					) : (
						<RadioGroup
							options={options}
							value={selectedUser}
							onChange={(item) => setSelectedUser(item)}
						/>
					)}
				</div>
			</div>

			<div className={styles.footer}>
				<Button
					style={{ margin: '0 24px 24px' }}
					disabled={loading}
					onClick={() => onCreate()}
				>
					{data.id ? 'Change' : 'Add'}
				</Button>
			</div>
		</>
	);
}

export default ChangeExecutive;
