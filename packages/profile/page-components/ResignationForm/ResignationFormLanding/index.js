import { Button, Modal, Placeholder } from '@cogoport/components';
import { CheckboxController, useForm } from '@cogoport/forms';
import { IcMArrowDown, IcMArrowRight, IcMFtick } from '@cogoport/icons-react';
import { useRouter } from '@cogoport/next';
import React, { useState, useEffect } from 'react';

import ResignEmployeeDetails from '../ResignEmployeeDetails';

import CommunicationMode from './CommunicationMode';
import ConfirmationModal from './ConfirmationModal';
import DatePicker from './DatePicker';
import styles from './styles.module.css';
import useGetEmployeeDetails from './useGetEmployeeDetails';
import usePostEmployeeDetails from './usePostEmployeeDetails';
import useUpdateOffBoarding from './useUpdateOffBoarding';

const TERMS_AND_CONDITIONS = `By clicking on Initiate Separation, you agree to serve your 
							  notice period per your employment contract. Per your employment contract, 
                              your LWD is 'dd/mm/yyyy'`;

function ResignationFormLanding({ refetch = () => {} }) {
	const CANCEL_REQUEST = 'cancellation_requested';
	const router = useRouter();

	const {
		data: dataItems = {}, loading = false,
		refetchApplicationDetails,
	} = useGetEmployeeDetails(router.query?.employee_id);

	const [show, setShow] = useState(false);

	const [showModal, setShowModal] = useState(false);
	const [showModalConfirm, setShowModalConfirm] = useState(false);

	const { application_exist } = dataItems || {};
	const { application_status } = dataItems || {};

	useEffect(() => {
		setShow(!application_exist);
	}, [loading, application_exist]);

	const {
		control,
		formState:{ errors = {} },
		handleSubmit,
		watch,
		setValue,
	} = useForm();

	const { postApplicationDetails } = usePostEmployeeDetails({ refetch });
	const { requestCancellation } = useUpdateOffBoarding({ refetch: refetchApplicationDetails });

	const onSubmit = async (values = {}) => {
		let payload = {
			reason               : values?.reason_of_leaving,
			mobile_number        : values?.mobile_number.number,
			mobile_country_code  : values?.mobile_number.country_code,
			email                : values?.personal_email,
			last_working_day     : values?.date,
			terms_and_conditions : TERMS_AND_CONDITIONS,
		};

		if (router.query?.employee_id) {
			payload = {
				...payload,
				employee_user_id    : router.query.employee_id,
				action_performed_by : 'hrbp',
			};
		}

		postApplicationDetails({ payload });
	};
	const cancelRequest = () => {
		const payload = {
			application_id : dataItems?.application_id,
			status         : CANCEL_REQUEST,
		};
		requestCancellation({ payload });
		setShowModalConfirm(false);
	};
	const handleSeparation = () => {
		setShowModal(true);
	};
	if (loading) {
		return <Placeholder height="100px" width="100%" margin="0px 0px 20px 0px" />;
	}

	return (
		<div className={styles.container}>

			<div className={styles.header} aria-hidden onClick={() => setShow(!show)}>
				<div>
					<div className={styles.title}>SEPARATION FORM</div>
					<div className={styles.sub_heading}>Please fill the information carefully</div>
				</div>
				{application_exist && (
					<div className={styles.header_right}>
						<Button
							size="md"
							themeType="secondary"
							onClick={() => setShowModalConfirm(true)}
							disabled={application_status === 'cancellation_requested'}
							className={styles.button_separation}
						>
							Request Cancellation
						</Button>
						<IcMArrowDown
							width={16}
							height={16}
							className={show ? styles.caret_active : styles.caret_arrow}
						/>
					</div>
				)}

			</div>
			<div className={show ? styles.item_container : styles.item_container_closed}>
				{application_exist && (
					<div className={styles.pop_up_container}>
						<IcMFtick height={18} width={18} color="#849E4C" />
						<span className={styles.pop_up_content}>
							Your application has been successfully
							forwarded to the HR Department. You will soon hear from the respective HR.
						</span>
					</div>
				)}
				<ResignEmployeeDetails
					control={control}
					errors={errors}
					dataItems={dataItems}
					loading={loading}
				/>
				<CommunicationMode
					control={control}
					errors={errors}
					dataItems={dataItems}
					watch={watch}
					setValue={setValue}
				/>
				<DatePicker control={control} dataItems={dataItems} errors={errors} setValue={setValue} />
			</div>
			{
			!application_exist && (
				<>
					<div className={styles.check_box_notice}>
						<CheckboxController
							control={control}
							name="check_separation"
							errors={errors}
							rules={{ required: true }}
							className={styles.check_box_notice_icon}
						/>
						<span className={styles.check_box_text}>
							{TERMS_AND_CONDITIONS}
						</span>
					</div>
					{errors.check_separation && (
						<div className={styles.error_msg}>
							*This is Required
						</div>
					)}
				</>
			)
            }
			{!application_exist && (
				<div className={styles.cta_buttons}>
					<Button size="md" themeType="secondary" style={{ marginRight: '4px' }}>Cancel</Button>
					<Button
						size="md"
						themeType="primary"
						onClick={handleSubmit(handleSeparation)}
					>
						Initiate Separation
						<IcMArrowRight width={16} height={16} style={{ marginLeft: '4px' }} />

					</Button>
				</div>
			)}

			<Modal size="sm" show={showModal} onClose={() => setShowModal(false)}>
				<Modal.Body>
					<div className={styles.modal_icon_container}>
						We hate to see you go
					</div>
					<div className={styles.modal_message_container}>
						<div className={styles.modal_message_text}>
							<span className={styles.modal_msg_highlight}>
								Are you sure you want to apply for separation.
							</span>
							{' '}
							click on &quot;Yes&quot; to proceed. Else, click on &quot;Cancel&quot; to go back.
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<Button
						size="md"
						themeType="secondary"
						className={styles.cancel_modal_btn}
						onClick={() => setShowModal(false)}
					>
						Cancel
					</Button>
					<Button
						size="md"
						themeType="primary"
						className={styles.proceed_modal_btn}
						onClick={() => {
							setShowModal(false);
							handleSubmit(onSubmit)();
						}}
					>
						Yes, Proceed
					</Button>
				</Modal.Footer>
			</Modal>

			<ConfirmationModal
				showModalConfirm={showModalConfirm}
				setShowModalConfirm={setShowModalConfirm}
				cancelRequest={cancelRequest}
			/>
		</div>
	);
}

export default ResignationFormLanding;
