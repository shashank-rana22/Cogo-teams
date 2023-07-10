import { cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import EmailCustomTag from './EmailCustomTag';
import styles from './styles.module.css';

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
				<div className={styles.tag_and_error_container}>
					<div className={styles.tag_container}>
						<input
							size="sm"
							placeholder="Enter recipient"
							type="text"
							value={value}
							id="input_id"
							onChange={(e) => handleChange({ e, type })}
							onKeyPress={(e) => handleKeyPress({ e, type })}
							className={cl`${errorValue
								? styles.error_input_container
								: styles.input_container}`}
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
