import Watermark from '../../../commons/Watermark';

import styles from './styles.module.css';

function Read({
	defaultValues = {},
}) {
	return (
		<main className={styles.main}>
			<Watermark text="draft" />
			<section className={styles.section}>
				<div className={styles.section_one}>
					<div className={styles.section_one_child_1}>
						<div className={styles['section_one_child_1-consigner']}>
							<p>Consigner/Shipper</p>
							<p>{defaultValues?.consigner || ''}</p>
						</div>

						<div className={styles['section_one_child_1-consignee']}>
							<p>Consignee (or order)</p>
							<p>{defaultValues?.consignee || ''}</p>
						</div>
						<div className={styles['section_one_child_1-notify_address']}>
							<p>Notify Address</p>
							<p>{defaultValues?.notify_address || ''}</p>
						</div>
						<div className={styles['section_one_child_1-location']}>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Place of Acceptance</p>
								<p>{defaultValues?.place_of_acceptance || ''}</p>
							</div>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Port of Loading</p>
								<p>{defaultValues?.port_of_loading || ''}</p>
							</div>
						</div>
						<div className={styles['section_one_child_1-location']}>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Port of Discharge</p>
								<p>{defaultValues?.port_of_discharge || ''}</p>
							</div>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Place of Delivery</p>
								<p>{defaultValues?.place_of_delivery || ''}</p>
							</div>
						</div>
						<div className={styles['section_one_child_1-location']}>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Vessel &amp; Voyage No.</p>
								<p>{defaultValues?.vessel_number || ''}</p>
							</div>
						</div>

					</div>

					<div className={styles.section_one_child_2}>
						<div className={styles['section_one_child_2-header']}>
							<p className={styles.header_text_md}>
								BILL OF LADING
							</p>
							<p className={styles.header_text_sm}>
								OR MULTIMODAL TRANSPORT DOCUMENT
							</p>
							<p className={styles.header_text_sm}>
								FMC NO: 028985
							</p>
						</div>
						<div className={styles['section_one_child_2-bl_number']}>
							<p>Bill of Lading No.</p>
							<b> BL0423003182</b>
						</div>
						<div className={styles['section_one_child_2-details']}>
							<img
								// eslint-disable-next-line max-len
								src="https://cogoport-production.sgp1.digitaloceanspaces.com/6f67ac5379afb6694a75e573407899f2/bluetidelogo.png"
								alt="Bluetide Logo"
							/>
							<span className={styles.details_text_lg}>
								BLUETIDE ESERVICES PVT. LTD.

							</span>
							<span className={styles.details_text_sm}>
								Complex, Old Delhi Gurgaon Road, Gurgaon

							</span>
							<span className={styles.details_text_sm}>
								Building No. 1, Shop No 7, Natraj

							</span>
							<span className={styles.details_text_sm}>
								Haryana - 122001

							</span>
							<span className={styles.details_text_sm}>
								Tel No: 43708987 Fax No: 43708988

							</span>
							<span className={styles.details_text_md}>
								Rge No:MTO/DGS/2274/DEC/2023

							</span>
							<p>
								Taken in Charge in apparently good condition,herein at the place of receipt,
								for transport anddelivery as mentioned above, unless otherwisestated.The MTO,
								in accordance with the provisions contained in the MTD, undertakes to perform or
								toprocure the performance of the multimodal transport from the place at which the
								goods are taken in charge, to the place designated for delivery and assumes
								the responsibility for suchtransport. One of the MTD(s) must be surrendered,
								duly endorsed in exchange for the goods in witness where of the original MTD
								all of this tenor and date have been signed in the number indicated below one
								of which being accomplished the other(s) to be void.

							</p>
						</div>
						<div className={styles['section_one_child_2-goods_delivery_contact']}>
							<p>For delivery of goods please apply to:</p>
							<p>{defaultValues?.goods_delivery_contact || ''}</p>
						</div>
					</div>
				</div>

				<div className={styles.section_two}>
					<table>
						<thead>
							<tr>
								<th>Container No.</th>
								<th>Marks and No.</th>
								<th>
									Number of Packages, kinds of packages, general description of goods
								</th>
								<th>Gross Weight</th>
								<th>Measurement</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{defaultValues?.containers?.[0]?.container_number || ''}</td>
								<td>{defaultValues?.containers?.[0]?.marks_and_number || ''}</td>
								<td>{defaultValues?.containers?.[0]?.package_description || ''}</td>
								<td>{defaultValues?.containers?.[0]?.gross_weight || ''}</td>
								<td>{defaultValues?.containers?.[0]?.measurement || ''}</td>
							</tr>
						</tbody>
					</table>
					<span>
						Particulars above furnished by consignee/consignor
					</span>
				</div>

				<div className={styles.section_three}>
					<div className={styles['section_three-element']}>
						<span>Freight Terms</span>
						<p>{defaultValues?.freight_amount || ''}</p>
					</div>
					<div className={styles['section_three-element']}>
						<span>Freight Payable At</span>
						<p>{defaultValues?.freight_payable_at || ''}</p>
					</div>
					<div className={styles['section_three-element']}>
						<span>
							Number of original MTD(s)
						</span>
						<p>{defaultValues?.number_of_original_MTDs || ''}</p>
					</div>
					<div className={styles['section_three-element']}>
						<span>
							Place and date of issue
						</span>
						<p>{defaultValues?.place_and_date_of_issue || ''}</p>
					</div>
				</div>

				<div className={styles.section_four}>
					<div className={styles.section_four_child_1}>
						<div className={styles['section_four_child_1-particular']}>
							<span className={styles.section_four_text}>
								Other Particulars (if any)
								<p>{defaultValues?.other_particulars || ''}</p>
							</span>
							<span className={styles.section_four_text}>
								(TERMS CONTINUED ON BACK HEREOF)
							</span>
						</div>
						<div className={styles['section_four_child_1-weight_measurement']}>
							<span className={styles.section_four_text}>
								Weight and measurement of container not to be included

							</span>
							<span className={styles.section_four_text}>
								(TERMS CONTINUED ON BACK HEREOF)

							</span>
						</div>
					</div>
					<span className={styles.section_four_child_2}>
						Authorised signatory
					</span>
				</div>
			</section>
		</main>
	);
}

export default Read;
