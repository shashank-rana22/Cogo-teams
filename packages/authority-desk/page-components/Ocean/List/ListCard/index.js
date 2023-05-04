import { Button, Tooltip } from "@cogoport/components";
import { format, startCase } from "@cogoport/utils";
import React, { useState } from "react";
import formatAmount from "@cogoport/globalization/utils/formatAmount";
import { IcMLiveChat } from "@cogoport/icons-react";
import CargoDetails from "../../../../commons/CargoDetails";
import PortDetails from "../../../../commons/PortDetails";
import ShipmentBreif from "../../../../commons/ShipmentBreif";
import RequestModal from "./RequestModal";
import AdditionalShipmentInfo from "./AdditionalShipmentInfo";
import ShipmentAudit from "./ShipmentAudit";
import styles from "./styles.module.css";

function ListCard({ item = {}, role = '', allFilters = {} }) {
	const [showDetails, setShowDetails] = useState(false);

	const [showAudit, setShowAudit] = useState(false); 

	const [requestModal , setRequestModal] = useState(false);

	const { freight_service, bill_of_ladings } = item;

	const {
		free_days_demurrage_destination,
		free_days_demurrage_origin,
		free_days_detention_destination,
		free_days_detention_origin,
	} = freight_service; 


	const renderButtonCondition = () => {
		if (
			role === 'okam' &&
			['ineligible', 'hold'].includes(tab) &&
			data?.validation_status?.invoice_validation_status
		) {
			return (
				<Button onClick={() => setRequestModal(!requestModal)}>
					Request
				</Button>
			);
		}

		if (role === 'credit_control') {
			return (
				<Button  onClick={() => setShowAudit(!showAudit)}>
					Audit
				</Button>
			);
		}
		return null;
	};

	const blContent = (
		<div className={styles.bl_remark_detail}>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Status</th>
						<th>Comment</th>
						<th>Date and time</th>
						<th>Bl Number</th>
					</tr>
				</thead>
				<tbody>
					{(bill_of_ladings || []).map((bl) => {
						return (bl?.bl_remarks || []).map((rm) => {
							return rm?.comment !== "System Invalidated" ? (
								<tr>
									<td> {rm?.name}</td>
									<td> {startCase(rm?.status)}</td>
									<td>{rm?.comment}</td>
									<td>
										{format(
											rm?.created_at,
											"dd MMM yyyy - hh:mm a",
											null,
											true
										)}
									</td>
									<td> {bl?.bl_number}</td>
								</tr>
							) : null;
						});
					})}
				</tbody>
			</table>
		</div>
	);

	return (
		<>
			<div className={styles.container}>
				<div className={styles.status}>
					&nbsp; Status : &nbsp;
					{startCase(freight_service?.state)}
				</div>

				<div className={styles.detail_container}>
					<div className={styles.shipment_details}>
						<ShipmentBreif item={item} />
						<PortDetails primary_service={freight_service} />
						<CargoDetails primary_service={freight_service} />
					</div>
					<div className={styles.shipment_extra_details}>
						<div className={styles.detention_demurrage}>
							<span>
								&nbsp; Origin : &nbsp;
								{free_days_detention_origin}
								&nbsp; Detention days , &nbsp;
								{free_days_demurrage_origin}
								&nbsp; Dumurrage Days
							</span>
							<br />
							<span>
								&nbsp; Destination : &nbsp;
								{free_days_detention_destination}
								&nbsp; Detention days, &nbsp;
								{free_days_demurrage_destination}
								&nbsp; Demurrage days &nbsp;
							</span>
						</div>

						<div className={styles.documents_and_invoices}>
							<div className={styles.validation}>
								Sales Invoice Status:
								{"  "}
								<span className={styles.text}>
									{item?.invoice_status
										? "System Validated "
										: "Validation Pending"}
									&nbsp;
								</span>
							</div>
						</div>

						<div className={styles.bl_details}>
							<div>
								<div>
									BL Type : &nbsp;
									{startCase(
										item?.freight_service?.bl_category
									)}
								</div>
								<div>
									Expected Release Date : &nbsp;
									{format(
										item?.bill_of_ladings
											?.expected_release_date,
										"dd MMM yyyy",
										null,
										true
									)}
								</div>
							</div>
							<div>
								<Tooltip
									placement="top"
									content={blContent}
									interactive
									className={styles.all_remarks}
								>
									<div>
										<IcMLiveChat />
									</div>
								</Tooltip>
							</div>
						</div>
					</div>

					<div className={styles.footer}>
						<div className={styles.organization_details}>
							<div className={styles.business_name}>
								Customer Name -{" "}
								{item?.importer_exporter?.business_name}
								&nbsp;
							</div>
							<div>
								Outstanding : &nbsp;
								{formatAmount({
									amount: item?.invoice_status
										?.outstanding_amount,
									currency: item?.currency,
									options: {
										style: "currency",
										currencyDisplay: "code",
										maximumFractionDigits: 2,
									},
								})}
							</div>
							<div>
								On-going shipments : &nbsp; &nbsp;{" "}
								{item?.ongoing_shipments}
							</div>
						</div>

						<div>
						{renderButtonCondition()}
						</div>
					</div>
				</div>

				{showDetails ? (
					<div className={styles.additional_audits}>
						{" "}
						<AdditionalShipmentInfo item={item} />{" "}
					</div>
				) : null}

				<div className={styles.less_more_details}>
					<span
						className={styles.additional_text}
						role="presentation"
						onClick={() => setShowDetails(!showDetails)}
					>
						&nbsp;
						{showDetails ? "View Less" : "View More"}
						&nbsp;
					</span>
				</div>
			</div>
			{showAudit ? (
				<ShipmentAudit
					showAudit={showAudit}
					setShowAudit={setShowAudit}
					item={item} 
					bucket = {allFilters.bucket}
				/>
			) : null} 

				{requestModal ? (
				<RequestModal
					requestModal={requestModal}
					setRequestModal={setRequestModal}
					data={item} 
					allFilters = {allFilters}
				/>
			) : null}
		</>
	);
}

export default ListCard;
