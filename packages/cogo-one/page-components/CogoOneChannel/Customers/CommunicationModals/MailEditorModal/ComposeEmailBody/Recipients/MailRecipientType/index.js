import { Popover, Input, ButtonIcon, Select } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useGetListEmailSuggestions from '../../../../../../../../hooks/useGetListEmailSuggestions';
import { RenderLabel } from '../OrgSpecificRecipients/orgSpecificFunctions';

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
	restrictMailToOrganizations = false,
	restrictMailToSingle = false,
	internalEmails = [],
}) {
	const [newEmailInput, setNewEmailInput] = useState('');

	const { emailSuggestionsData, loading } = useGetListEmailSuggestions({
		searchQuery: newEmailInput,
	});

	const { body = [] } = emailSuggestionsData || {};

	const emailSuggestions = body?.map((itm) => itm.email) || [];

	const showPopover = newEmailInput && !isEmpty(emailSuggestions) && !loading;

	const filteredInternalMails = internalEmails?.filter(
		(itm) => !emailRecipientType.includes(itm?.value),
	);

	return (
		<div className={styles.tags_div}>
			{(emailRecipientType || []).map(
				(data) => (
					<EmailCustomTag
						key={data}
						email={data}
						handleDelete={handleDelete}
						type={type}
						restrictMailToSingle={restrictMailToSingle}
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

			{(!restrictMailToOrganizations && (!restrictMailToSingle || !emailRecipientType.length)) ? (
				<div
					className={styles.add_icon}
					onClick={() => handleEdit({ type, setNewEmailInput })}
					role="presentation"
				>
					+
				</div>
			) : null}

			{
				restrictMailToOrganizations && !isEmpty(filteredInternalMails) && type !== 'toUserEmail' ? (
					<Select
						size="xs"
						options={filteredInternalMails}
						placeholder="select internal mails"
						className={styles.select_container}
						renderLabel={(item) => <RenderLabel item={item} />}
						onChange={(val) => handleKeyPress({
							type,
							email: val,
							setNewEmailInput,
						})}
					/>
				) : null
			}
		</div>
	);
}

export default MailRecipientType;
