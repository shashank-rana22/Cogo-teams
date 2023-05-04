import React from "react";
import { CheckboxGroup, Modal , Textarea} from "@cogoport/components";
import useUpdateShipmentBlDetails from "../../../../../hooks/useUpdateShipmentBlDetails";
import RestrictRequest from "./RestrictRequest";
import styles from "./styles.module.css";

function RequestModal({
	requestModal,
	setRequestModal = () => {},
	data = {},
	allFilters = {},
	refetch = () => {},
}) {
	const { trade_type } = data || {};

	const documentOptions = data?.bill_of_ladings || data?.delivery_orders;

	const blOptions = [];
	const filteredBls = documentOptions?.filter(
		(item) => !["surrender_pending", "surrendered"].includes(item?.status)
	);
	filteredBls?.map((item) =>
		blOptions.push({
			label: item?.bl_number || item?.do_number,
			value: item?.id,
		})
	);

	// const controls = control(blOptions);

	// const { handleSubmit, fields, error, onError, onUpdate } = useUpdateShipmentBlDetailss(
	// 	{
	// 		blOptions,
	// 		setRequestModal,
	// 		controls,
	// 		refetch,
	// 		trade_type,
	// 	},
	// ); 

	const setValue = (key, value) => {
		setFormValues({ ...formValues, [key]: value });
	};

	return (
		<div className={styles.container}>
			{data?.is_request_doc_allowed ? (
				<Modal
					show={requestModal}
					onClose={() => setRequestModal(false)}
				>
					<div style={{ minHeight: "30vh" }}>
						<div className={styles.heading}>
							Request for Approval
						</div>

						{controls?.[0]?.options?.length === 0 ? (
							<div style={{ fontWeight: "500", color: "red" }}>
								No document has been uploaded!
							</div>
						) : null}
					</div>

					<div className={styles.form}>
						{/* <CheckboxGroup
							options={blOptions}
							onChange={(val) => setValue('bl_doc', val)}
							value={formValues.bl_doc || []}
							style={{ marginLeft: "auto" }}
							className={styles.options}
						/> */}  

							<Textarea
							value={formValues.remarks}
							onChange={(val) => setValue('remarks', val)}
							size="md"
							placeholder="Enter Remarks..."
						/>
						
					</div>

					<div className={styles.button_container}>
						{/* <Button onClick={handleSubmit(onUpdate, onError)}>Request</Button> */}
					</div>
				</Modal>
			) : (
				<RestrictRequest
					requestModal={requestModal}
					setRequestModal={setRequestModal}
				/>
			)}
		</div>
	);
}

export default RequestModal;
