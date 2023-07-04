import { Popover, Button } from '@cogoport/components';
import React, { useState } from 'react';

import getElementController from '../../../../../../../../../../commons/forms/getElementController';
import useCreateNewUser from '../../../../../../../../../../hooks/useCreateNewUser';

import styles from './styles.module.css';

function PopoverContent({
	control,
	createUser,
	handleSubmit,
	errors,
	controls,
	loading,
	setShow,
}) {
	return (
		<div style={{ width: '300px', padding: 8 }}>
			<form>
				{controls.map((controlItem) => {
					const { name, label, type } = controlItem;

					const Element = getElementController(type);

					return (
						<div key={name} className={`${styles.form_group} ${styles[name]}`}>
							<div className={styles.label}>{label}</div>

							{name === 'body' ? (
								<div className={styles.label} style={{ marginTop: '12px' }}>
									Dear
									{' '}
									{'<Recipient Name>'}
								</div>
							) : null}

							<div className={`${styles.input_group} ${styles[name]}`}>
								<Element
									{...controlItem}
									key={name}
									control={control}
									id={`${name}_input`}
								/>
							</div>

							{errors?.[name]?.message ? (
								<div className={styles.error_message}>
									{errors?.[name]?.message}
								</div>
							) : null}
						</div>
					);
				})}

				<div className={styles.button_div}>
					<Button
						onClick={() => setShow(false)}
						disabled={loading}
						size="sm"
						themeType="secondary"
						id="checkout_change_operation_executive_cu_cancel_btn"
					>
						Cancel
					</Button>

					<Button
						onClick={handleSubmit(createUser)}
						disabled={loading}
						size="sm"
						id="checkout_change_operation_executive_cu_save_btn"
						style={{ marginLeft: '12px' }}
					>
						{loading ? 'Saving...' : 'Save'}
					</Button>
				</div>
			</form>
		</div>
	);
}

function CreateUser({
	organization_id,
	onCreate = () => {},
	title = '',
	branch_id = null,
}) {
	const [show, setShow] = useState(false);

	const { ...formProps } = useCreateNewUser({
		organization_id,
		branch_id,
		onCreate: () => {
			setShow(false);
			onCreate();
		},
	});

	return (
		<div className={styles.container}>
			<Popover
				content={<PopoverContent {...formProps} setShow={setShow} />}
				onClickOutside={() => setShow(false)}
				interactive
				theme="light"
				visible={show}
				placement="bottom"
			>
				<Button
					onClick={() => setShow(true)}
					className={title ? 'title' : ''}
					id="checkout_change_operation_executive_cu_add_btn"
					themeType="secondary"
				>
					{title || 'Add New User'}
				</Button>
			</Popover>
		</div>
	);
}

export default CreateUser;
