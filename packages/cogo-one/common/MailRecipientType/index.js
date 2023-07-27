import { Popover, Input, ButtonIcon } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetListEmailSuggestions from '../../hooks/useGetListEmailSuggestions';

import EmailCustomTag from './EmailCustomTag';
import ListEmails from './ListEmails';
import styles from './styles.module.css';

function MailRecipientType({
	emailRecipientType = [],
	handleDelete = () => {},
	showControl = '',
	type = '',
	errorValue = '',
	handleChange = () => {},
	handleKeyPress = () => {},
	handleCancel = () => {},
	handleEdit = () => {},
	isDisabled = false,
}) {
	const [newEmailInput, setNewEmailInput] = useState('');

	const { emailSuggestionsData, loading } = useGetListEmailSuggestions({
		searchQuery: newEmailInput,
	});

	const { body = [] } = emailSuggestionsData || {};

	const emailSuggestions = body?.map((itm) => itm.email) || [];

	const showPopover = newEmailInput && !isEmpty(emailSuggestions) && !loading;

	return (
		<div className={styles.tags_div}>
			{(emailRecipientType || []).map(
				(data) => (
					<EmailCustomTag
						key={data}
						email={data}
						handleDelete={handleDelete}
						type={type}
						isDisabled={isDisabled}
					/>
				),
			)}

			{showControl === type && (
				<Popover
					placement="bottom"
					visible={showPopover}
					caret={false}
					render={(
						showPopover ? (
							<ListEmails
								loading={loading}
								emailSuggestions={emailSuggestions}
								type={type}
								setNewEmailInput={setNewEmailInput}
								handleKeyPress={handleKeyPress}
							/>
						) : null
					)}
				>
					<div className={styles.tag_and_error_container}>
						<div className={styles.tag_container}>
							<Input
								size="xs"
								placeholder="Enter recipient"
								type="text"
								value={newEmailInput}
								onChange={(val) => handleChange({ val, type, setNewEmailInput })}
								onKeyDown={(event) => handleKeyPress({ event, type, newEmailInput, setNewEmailInput })}
								suffix={newEmailInput ? (
									<ButtonIcon
										size="xs"
										icon={<IcMCross />}
										disabled={false}
										themeType="primary"
										onClick={() => handleCancel({ type, setNewEmailInput })}
									/>
								) : null}
								className={errorValue
									? styles.error_input_container
									: styles.input_container}
							/>
						</div>

						{errorValue ? (
							<div className={styles.error_content_container}>
								{errorValue}
							</div>
						) : null}
					</div>
				</Popover>
			)}

			{!isDisabled && (
				<div
					className={styles.add_icon}
					onClick={() => handleEdit({ type, setNewEmailInput })}
					role="presentation"
				>
					+
				</div>
			)}
		</div>
	);
}

export default MailRecipientType;
