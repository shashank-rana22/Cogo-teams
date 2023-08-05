import { Button, CheckboxGroup, Modal, MultiSelect, Tags } from '@cogoport/components';
import { useState } from 'react';

import EmailInfo from './EmailInfo';
import PortSelect from './PortSelect';
import styles from './styles.module.css';

function EmailPreview({ isEmail = false, setIsEmail }) {
	const onClose = () => {
		setIsEmail(false);
	};

	const onConfirm = () => {
		console.log('clicked confirmed');
	};

	const options = [
		{ label: 'vedantKirve@cogoport.com', value: 'vedantKirve@cogoport.com' },
		{ label: 'adityEshwar@cogoport.com', value: 'adityEshwar@cogoport.com' },
		{ label: 'sahithiPabolu@cogoport.com', value: 'sahithiPabolu@cogoport.com' },
		{ label: 'vedantKirve123@cogoport.com', value: 'vedantKirve123@cogoport.com' },
	];

	const [emailSelected, setEmailSelected] = useState([]);

	const [tagsOption, setTagsOption] = useState([]);

	const [checkBoxValue, setCheckBoxValue] = useState([]);

	const checkBoxOptions = [
		{
			label : 'checkbox1',
			value : 'a1',
		}, {
			label : 'checkbox12',
			value : 'a12',
		},
	];

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
		<div className={styles.container}>
			<Modal size="xl" show={isEmail} onClose={onClose}>
				<Modal.Header title={
					<PortSelect />
					}
				/>
				<Modal.Body>
					<>
						<div className={styles.email_title}>
							Email Preview
						</div>
						<div className={styles.email_info}>
							(You are about to share
							information with the supplier, please verify the following details.)
						</div>

					</>

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
					<div>
						<img
							width="100%"
							alt=""
							height={300}
							className={styles.img}
							src="https://cdn.cogoport.io/cms-prod/cogo_admin/vault/original/yellow_card.svg"
						/>
					</div>
					<CheckboxGroup
						options={checkBoxOptions}
						onChange={(val) => { setCheckBoxValue((prev) => ({ ...prev, rowCheck: val })); }}
						value={checkBoxValue?.rowCheck}
					/>
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.footer}>
						<div className={styles.footer_title}>
							Note : The selected report will be generated and sent automatically
						</div>
						<div className={styles.footer_buttons}>
							<Button
								onClick={onClose}
								size="md"
								themeType="secondary"
								className={styles.cancel}
							>
								Cancel
							</Button>
							<Button onClick={onConfirm} size="md" themeType="accent">Confirm</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EmailPreview;
