import { Button, Modal } from "@cogoport/components"; 
import { CheckboxGroupController, TextAreaController, useForm } from '@cogoport/forms';
import React from "react";
import useUpdateShipmentBlDoDetails from "../../../../../../../hooks/useUpdateShipmentBlDoDetails";

import styles from "./styles.module.css";

function Form({
	handleClose = () => {},
	blData = [],
	hold = false,
	surrender = false,
	bucket,
	trade_type = "export",
}) {
	const docOptions = () => {
		if (surrender) {
			const docsToSurrender = blData.filter(
				(item) =>
					[
						"draft_bill_of_lading",
						"bill_of_lading",
						"draft_house_bill_of_lading",
						"house_bill_of_lading",
					].includes(item?.document_type) &&
					item?.status === "approved"
			);
			return docsToSurrender;
		}

		return blData;
	};

	const {
		formState: { errors },
		control,
		handleSubmit,
	} = useForm();

	const { onUpdate, loading } = useUpdateShipmentBlDoDetails({ trade_type });

	let heading = "Approve Document";
	let status = "approved";
	if (hold) {
		heading = "Hold Document";
		status = "hold";
	} else if (surrender) {
		heading = "Approve for Surrender Document";
		status = "surrender_pending";
	} else if (bucket === "approved") {
		heading = "Approve for Release";
		status = "release_pending";
	}

	const onSubmit = (formData) => {
		const payload = {
			ids: formData?.ids,
			data: {
				[trade_type === "export" ? "bl_remarks" : "remarks"]: {
					comment: formData?.remarks,
					status: "requested",
				},
				status,
			},
		};
		onUpdate(payload);
	};

	return (
		<Modal
			show
			onClose={handleClose}
			showCloseIcon={!loading}
			className={styles.request_modal}
		>
			<Modal.Header title={heading} />

			<Modal.Body>
				<div className={styles.form}>
					{(docOptions()).length === 0 ? (
						<div className={styles.no_data_warning}>
							No document has been uploaded!
						</div>
					) : null}

					<div className={styles.form_element}>
						<CheckboxGroupController
							name="ids"
							control={control}
							size="md"
							options={docOptions()}
							className={styles.checkbox_controller}
							rules={{ required: "This field is required" }}
						/>
						{errors.ids ? (
							<div className={styles.error_message}>
								{errors.ids.message}
							</div>
						) : null}
					</div>

					<div className={styles.form_element}>
						<TextAreaController
							name="remarks"
							control={control}
							size="md"
							rows={4}
							placeholder="Enter Remarks Here..."
							rules={{ required: "This field is Required" }}
						/>
						{errors.remarks ? (
							<div className={styles.error_message}>
								{errors.remarks.message}
							</div>
						) : null}
					</div>
				</div>
			</Modal.Body>

			<Modal.Footer>
				<Button
					disabled={loading}
					themeType="secondary"
					onClick={handleClose}
				>
					Cancel
				</Button>
				<Button disabled={loading} onClick={handleSubmit(onSubmit)}>
					{heading}
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Form;
