import Layout from '@cogoport/air-modules/components/Layout';
import { Button, Modal, CheckboxGroup } from '@cogoport/components';
import { useForm } from '@cogoport/forms';

import controls from '../../../configs/add-poc-controls';

import styles from './styles.module.css';

const CHECK_MULTIPLE_POC = 1;
function PreviewEmail({
	emailData = {},
	show = false,
	loading = false,
	onCloseModal = () => {},
	onConfirm = () => {},
	data = {},
	setCheckboxValue = () => {},
	checkboxValue = [],
}) {
	const pocOptions = (data?.repository_data?.pocs_data || []).map((item) => (
		{
			label : item?.name,
			value : item?.email,
		}
	));
	const finalControls = controls(pocOptions);

	const {
		control,
		formState: { errors },
		handleSubmit,
		watch,
	} = useForm(finalControls);

	const showCCEmailRecipient = watch('add_cc');

	const pocData = watch('recipient_email');

	const showElements = {
		add_cc: pocOptions.length > CHECK_MULTIPLE_POC,
	};

	const ccEmailOptions = (pocOptions || []).filter((item) => item.value !== pocData);

	return (

		<Modal
			size="lg"
			show={show}
			onClose={() => onCloseModal(false)}
			style={{ height: '700px' }}
		>
			<Modal.Header title={emailData?.subject} />
			<div className={styles.modal_body}>
				<Modal.Body style={{ maxHeight: '570px' }}>
					<div className={styles.container}>
						<div>Select the recipient:</div>
						<Layout
							fields={finalControls}
							errors={errors}
							control={control}
							showElements={showElements}
						/>
						{
						showCCEmailRecipient
						&& (
							<>
								<div>Select the CC recipient</div>
								<CheckboxGroup
									value={checkboxValue}
									onChange={setCheckboxValue}
									options={ccEmailOptions}
								/>
							</>

						)
					}

						<div>
							<div dangerouslySetInnerHTML={{ __html: emailData?.template }} />
						</div>
					</div>
				</Modal.Body>
			</div>
			<Modal.Footer>
				<div className={styles.button_container}>
					<Button
						className="secondary md"
						disabled={loading}
						onClick={() => onCloseModal(false)}
					>
						Cancel
					</Button>
				</div>
				<Button
					className="primary md"
					disabled={loading}
					onClick={handleSubmit((formValues) => onConfirm(false, formValues))}
				>
					Send Mail
				</Button>
			</Modal.Footer>
		</Modal>

	);
}

export default PreviewEmail;
