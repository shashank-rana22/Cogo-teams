import { Button, Modal, MultiSelect, Tags } from '@cogoport/components';
import { useState } from 'react';

import EmailInfo from './EmailInfo';
import styles from './styles.module.css';

function EmailPreview({ isEmail = false, setIsEmail }) {
	const onClose = () => {
		setIsEmail(false);
	};

	const options = [
		{ label: 'vedantKirve@cogoport.com', value: 'vedantKirve@cogoport.com' },
		{ label: 'adityEshwar@cogoport.com', value: 'adityEshwar@cogoport.com' },
		{ label: 'sahithiPabolu@cogoport.com', value: 'sahithiPabolu@cogoport.com' },
		{ label: 'vedantKirve123@cogoport.com', value: 'vedantKirve123@cogoport.com' },
	];

	const [emailSelected, setEmailSelected] = useState([]);

	const [tagsOption, setTagsOption] = useState([]);

	const onTagChange = (val) => {
		setTagsOption(val);

		const multiSelectOptions = val.map((value) => value?.children);

		setEmailSelected(multiSelectOptions);
	};

	const onMultiSelect = (val) => {
		setEmailSelected(val);

		const tagOptions = val.map((value) => ({
			key      : value,
			children : value,
			disabled : false,
			tooltip  : false,
			color    : 'green',
			closable : true,
		}));

		setTagsOption(tagOptions);
	};

	return (
		<div>
			<div style={{ padding: '20px' }}>

				<Modal size="xl" show={isEmail} onClose={onClose}>
					<Modal.Header title={(
						<>
							<div className={styles.email_title}>
								Email Preview
							</div>
							<div>
								(You are about to share
								information with the supplier, please verify the following details.)
							</div>

						</>
					)}
					/>
					<Modal.Body>
						<div className={styles.email_fields}>
							<div className={styles.field}>
								From :
							</div>
							{' '}
							sayali.kumar@cogoport.com
						</div>
						<div className={styles.divider} />
						<div />
						<div className={styles.email_fields}>
							<div className={styles.field}>
								To :
							</div>
							{' '}
							<div className={styles.email}>
								<div className={styles.multi_select}>
									<MultiSelect
										value={emailSelected}
										onChange={onMultiSelect}
										placeholder="Select Recipient"
										options={options}
										isClearable

									/>
								</div>
								<div>
									<Tags
										items={tagsOption}
										onItemsChange={onTagChange}
										size="lg"
									/>
								</div>
							</div>

						</div>
						<div className={styles.divider} />
						<div className={styles.email_fields}>
							<div className={styles.field}>
								Subject :
								{'  '}
							</div>
							Demand for August 2023 - Marine Trans Shipping Private Limited
						</div>
						<div className={styles.divider} />
						<div />
						<EmailInfo />
						<div className={styles.divider} />
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={onClose}>OK</Button>
					</Modal.Footer>
				</Modal>
			</div>

		</div>
	);
}

export default EmailPreview;
