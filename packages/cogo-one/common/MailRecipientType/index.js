import { cl } from '@cogoport/components';
import { IcMCross } from '@cogoport/icons-react';

import CustomInput from '../EmailCustomTag';

import styles from './styles.module.css';

function MailRecipientType({
	arrayType = [],
	handleDelete = () => {},
	showControl,
	type = '',
	value,
	errorValue,
	handleChange = () => {},
	handleKeyPress = () => {},
	handleError = () => {},
	handleEdit = () => {},
	inputType = '',
}) {
	return (
		<div className={styles.tags_div}>
			{(arrayType || []).map((data) => (
				<CustomInput
					email={data}
					handleDelete={handleDelete}
					type={type}
				/>
			))}

			{(showControl && (type === inputType)) && (
				<div className={styles.tag_and_errorcontainer}>
					<div className={styles.tag_container}>
						<input
							size="sm"
							placeholder="Enter recipient"
							type="text"
							value={value}
							onChange={(e) => handleChange(e)}
							onKeyPress={(e) => handleKeyPress(e)}
							className={cl`
										${errorValue ? styles.error_input_container : styles.input_container}`}
							id="inputId"
						/>
						<div className={styles.cross_icon}>
							<IcMCross onClick={() => handleError(type)} />
						</div>
					</div>
					{(errorValue) && (
						<div className={styles.error_content_container}>
							{errorValue}
						</div>
					)}
				</div>
			)}
			<div
				className={styles.add_icon}
				onClick={() => handleEdit(inputType)}
				role="presentation"
			>
				+
			</div>
		</div>
	);
}

export default MailRecipientType;
