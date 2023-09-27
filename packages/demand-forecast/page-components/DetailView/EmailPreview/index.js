import { Button, Modal, MultiSelect, Tags, Toggle, Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';

import EmailPreviewLoading from '../../../common/EmptyState/EmailPreviewLoding';
import useGetEmailPreview from '../../../hooks/useGetEmailPreview';
import useSendRequirementEmail from '../../../hooks/useSendRequirementEmail';

import CogoportTemplate from './CogoportTemplate';
import EmailInfo from './EmailInfo';
import styles from './styles.module.css';

const API_RESPONSE = 200;

function EmailPreview({
	isEmail = false, setIsEmail = () => {},
	service_provider = {}, origin_location_id = '',
	destination_location_id = '',
}) {
	const { t } = useTranslation(['demandForecast']);
	const [emailSelected, setEmailSelected] = useState([]);
	const [tagsOption, setTagsOption] = useState([]);
	const [isSinglePortPair, setIsSinglePortPair] = useState(false);
	const [errors, setErrors] = useState(false);

	const { getEmailPreview, data: emailPreviewData, loading: getLoading } = useGetEmailPreview();
	const { sendRequirementEmail, loading: sendLoading } = useSendRequirementEmail();

	const { id: organization_id } = service_provider;

	useEffect(() => {
		getEmailPreview({ organization_id });
	}, [getEmailPreview, organization_id]);

	useEffect(() => {
		if (!isEmpty(emailSelected)) {
			setErrors(false);
		}
	}, [emailSelected]);

	const { from = {}, organization_users = [], subject = '' } = emailPreviewData?.data || {};

	console.log('organization_users::', organization_users);

	const options = organization_users.map((user) => ({
		label : user?.name,
		value : user?.user_id,
	}));

	const onClose = () => {
		setIsEmail(false);
	};

	const onConfirm = async () => {
		if (isEmpty(emailSelected)) {
			setErrors(true);
			return;
		}

		const payload = {
			organization_id,
			organization_user_ids : emailSelected,
			email_sent_type       : isSinglePortPair ? 'port_pair' : 'all',
			...(isSinglePortPair ? { origin_location_id, destination_location_id } : {}),
		};

		const response = await sendRequirementEmail({ payload });

		if (response?.status === API_RESPONSE) {
			Toast.success('Your email will be sent');
			setIsEmail(false);
		}
	};

	const onTagChange = (val) => {
		setTagsOption(val);
		const multiSelectOptions = val?.map((value) => value?.key);
		setEmailSelected(multiSelectOptions);
	};

	const onMultiSelect = (val) => {
		setEmailSelected(val);

		const tagOptions = val.map((value) => {
			const userInfo = organization_users.find((user) => user.user_id === value);
			return {
				key      : value,
				children : userInfo?.name,
				disabled : false,
				tooltip  : false,
				color    : 'green',
				closable : true,
			};
		});

		setTagsOption(tagOptions);
	};

	return (
		<div className={styles.container}>
			<Modal size="xl" show={isEmail} onClose={onClose}>
				<Modal.Header title={(
					<div className={styles.header}>
						<div>
							Generate report for  :
						</div>
						<div>
							<Toggle
								size="md"
								disabled={false}
								onLabel="Selected Port Pair"
								offLabel="All Assigned Port Pairs"
								onChange={() => setIsSinglePortPair((prev) => !prev)}
								showOnOff
								value={isSinglePortPair}
							/>
						</div>
					</div>
				)}
				/>
				<Modal.Body>
					{
						getLoading ? <EmailPreviewLoading /> : (
							<>
								<div>
									<div className={styles.email_title}>
										Email Preview
									</div>
									<div className={styles.email_info}>
										{t('demandForecast:email_preview')}
									</div>
								</div>
								<div className={styles.divider} />

								<div className={styles.email_fields}>
									<div className={styles.field}>
										From :
									</div>
									<div className={styles.email_name}>
										{from?.email}
									</div>

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
										{errors && (
											<div className={styles.error}>
												Atleast select one user.
											</div>
										)}
										<div className={styles.tags}>
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
									<div className={styles.subject_info}>
										{subject}
									</div>

								</div>
								<div className={styles.divider} />
								<div />
								<EmailInfo />
								<div className={styles.divider} />
								<div>
									<CogoportTemplate from={from} />
								</div>
							</>
						)
					}
				</Modal.Body>
				<Modal.Footer>
					<div className={styles.footer}>
						<div className={styles.footer_title}>
							{t('demandForecast:email_sent_message')}
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
							<Button
								onClick={onConfirm}
								size="md"
								themeType="accent"
								disabled={sendLoading}
							>
								Confirm
							</Button>
						</div>
					</div>
				</Modal.Footer>
			</Modal>
		</div>
	);
}

export default EmailPreview;
