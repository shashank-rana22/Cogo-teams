import { Button } from '@cogoport/components';
import { TextAreaController } from '@cogoport/forms';

import Watermark from '../../../commons/Watermark';

import styles from './styles.module.css';
import { sectionThreeFields, containersDetails } from './templateConfig';

function Write({
	control,
	setaddAnnexure = () => {},
	addAnnexure = false,
	isReadonly = false,
	initialValues = {},
}) {
	const { port_of_loading, port_of_discharge, consigner } = initialValues;

	return (
		<main className={styles.main}>
			<Watermark text="draft" />
			<section className={styles.section}>
				<div className={styles.section_one}>
					<div className={styles.section_one_child_1}>
						<div className={styles['section_one_child_1-consigner']}>
							<p>Consigner/Shipper</p>
							<TextAreaController
								name="consigner"
								control={control}
								defaultValue={consigner}
								rows={3}
								style={{ margin: 0 }}
							/>
						</div>

						<div className={styles['section_one_child_1-consignee']}>
							<p>Consignee (or order)</p>
							<TextAreaController
								name="consignee"
								control={control}
								rows={4}
							/>
						</div>
						<div className={styles['section_one_child_1-notify_address']}>
							<p>Notify Address</p>
							<TextAreaController
								name="notify_address"
								control={control}
								rows={5}
							/>
						</div>
						<div className={styles['section_one_child_1-location']}>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Place of Acceptance</p>
								<TextAreaController
									name="place_of_acceptance"
									control={control}
									rows={2}
								/>
							</div>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Port of Loading</p>
								<TextAreaController
									name="port_of_loading"
									control={control}
									defaultValue={port_of_loading}
									rows={2}
								/>
							</div>
						</div>
						<div className={styles['section_one_child_1-location']}>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Port of Discharge</p>
								<TextAreaController
									name="port_of_discharge"
									control={control}
									defaultValue={port_of_discharge}
								/>
							</div>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Place of Delivery</p>
								<TextAreaController
									name="place_of_delivery"
									control={control}
								/>
							</div>
						</div>
						<div className={styles['section_one_child_1-location']}>
							<div className={styles['section_one_child_1-location_element']}>
								<p>Vessel &amp; Voyage No.</p>
								<TextAreaController
									name="vessel_number"
									control={control}
								/>
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
							<TextAreaController
								name="goods_delivery_contact"
								control={control}
								rows={7}
							/>
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
								{containersDetails.map((name) => (
									<td>
										<TextAreaController name={name} control={control} rows={10} />
									</td>
								))}
							</tr>
						</tbody>
					</table>
					<span>
						Particulars above furnished by consignee/consignor
					</span>
				</div>

				<div className={styles.section_three}>
					{sectionThreeFields.map(({ label, name }) => (
						<div className={styles['section_three-element']}>
							<span>{label}</span>
							<TextAreaController name={name} control={control} />
						</div>
					))}
				</div>

				<div className={styles.section_four}>
					<div className={styles.section_four_child_1}>
						<div className={styles['section_four_child_1-particular']}>
							<span className={styles.section_four_text}>
								Other Particulars (if any)
								<TextAreaController
									name="other_particulars"
									control={control}
									rows={1}
								/>
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
				{!isReadonly && (
					<div className={styles.button_wrapper}>
						<Button
							onClick={() => setaddAnnexure(!addAnnexure)}
							size="sm"
						>
							{addAnnexure ? 'Remove' : 'Add'}
							&nbsp;
							Annexure
						</Button>
					</div>
				)}
			</section>
		</main>
	);
}

export default Write;
