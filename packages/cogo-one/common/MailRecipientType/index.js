import { Popover } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import useGetListEmailSuggestions from '../../hooks/useGetListEmailSuggestions';

import EmailCustomTag from './EmailCustomTag';
import ListEmails from './ListEmails';
import styles from './styles.module.css';

const TRIGGER_WHEN_QUERY_LENGTH_GREATER_THAN = 3;

function MailRecipientType({
	emailRecipientType = [],
	handleDelete = () => {},
	showControl = '',
	type = '',
	value = '',
	errorValue = '',
	handleChange = () => {},
	handleKeyPress = () => {},
	handleError = () => {},
	handleEdit = () => {},
}) {
	const shouldShowSuggestions = value.length > TRIGGER_WHEN_QUERY_LENGTH_GREATER_THAN;

	const { emailSuggestions, loading } = useGetListEmailSuggestions({
		searchQuery: value,
		shouldShowSuggestions,
	});

	return (
		<div className={styles.tags_div}>
			{(emailRecipientType || []).map(
				(data) => (
					<EmailCustomTag
						key={data}
						email={data}
						handleDelete={handleDelete}
						type={type}
					/>
				),
			)}

			{showControl === type && (
				<Popover
					placement="bottom"
					key={showControl}
					visible={(
						shouldShowSuggestions
						&& !isEmpty(emailSuggestions)
						&& !loading
					)}
					caret={false}
					render={(
						<ListEmails
							loading={loading}
							emailSuggestions={emailSuggestions}
							type={type}
							handleKeyPress={handleKeyPress}
						/>
					)}
				>
					<div className={styles.tag_and_error_container}>
						<div className={styles.tag_container}>
							<input
								size="sm"
								placeholder="Enter recipient"
								type="text"
								value={value}
								onChange={(event) => handleChange({ event, type })}
								onKeyPress={(event) => handleKeyPress({ event, type })}
								className={errorValue
									? styles.error_input_container
									: styles.input_container}
							/>
							<div className={styles.cross_icon}>
								<IcMCross onClick={() => handleError(type)} />
							</div>
						</div>

						{errorValue && (
							<div className={styles.error_content_container}>
								{errorValue}
							</div>
						)}
					</div>
				</Popover>
			)}

			<div
				className={styles.add_icon}
				onClick={() => handleEdit(type)}
				role="presentation"
			>
				+
			</div>
		</div>
	);
}

export default MailRecipientType;
