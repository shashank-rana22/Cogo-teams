import { Button } from '@cogoport/components';
import { TextAreaController } from '@cogoport/forms';

import styles from './styles.module.css';

function Write({
	control,
	setaddAnnexure = () => {},
	addAnnexure = false,
	isReadonly = false,
	initialValues,
}) {
	const { port_of_loading, port_of_discharge, consigner } = initialValues;
	return (
		<main className={styles.main}>
			<section style={{
				width           : '696px',
				position        : 'relative',
				pageBreakAfter  : 'auto',
				backgroundColor : '#fff',
			}}
			>
				<div style={{ border: '1px solid black', display: 'flex' }}>
					<div style={{ border: '1px solid black', width: '53%' }}>
						<div style={{
							borderBottom  : '1px solid black',
							padding       : '8px',
							height        : '113px',
							display       : 'flex',
							flexDirection : 'column',
						}}
						>
							<p style={{ fontSize: '10px', margin: '0' }}>Consigner/Shipper</p>
							<TextAreaController
								name="consigner"
								control={control}
								defaultValue={consigner}
								rows={3}
							/>
						</div>

						<div style={{
							borderBottom  : '1px solid black',
							borderTop     : '1px solid black',
							padding       : '8px',
							height        : '140px',
							display       : 'flex',
							flexDirection : 'column',
						}}
						>
							<p style={{ fontSize: '10px', margin: '0' }}>Consignee (or order)</p>
							<TextAreaController
								name="consignee"
								control={control}
								rows={4}
							/>
						</div>
						<div style={{
							borderBottom  : '1px solid black',
							borderTop     : '1px solid black',
							padding       : '8px',
							height        : '157px',
							display       : 'flex',
							flexDirection : 'column',
						}}
						>
							<p style={{ fontSize: '10px', margin: '0' }}>Notify Address</p>
							<TextAreaController
								name="notify_address"
								control={control}
								rows={5}
							/>
						</div>
						<div style={{
							borderBottom   : '1px solid black',
							borderTop      : '1px solid black',
							padding        : '8px',
							height         : '70px',
							display        : 'flex',
							justifyContent : 'space-between',
						}}
						>
							<div style={{
								display       : 'flex',
								flexDirection : 'column',
								width         : '50%',
								margin        : '0 4px 0 0',
							}}
							>
								<p style={{ fontSize: '10px', margin: '0' }}>Place of Acceptance</p>
								<TextAreaController
									name="place_of_acceptance"
									control={control}
									rows={2}
								/>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
								<p style={{ fontSize: '10px', margin: '0' }}>Port of Loading</p>
								<TextAreaController
									name="port_of_loading"
									control={control}
									defaultValue={port_of_loading}
									rows={2}
								/>
							</div>
						</div>
						<div style={{
							borderBottom   : '1px solid black',
							borderTop      : '1px solid black',
							padding        : '8px',
							height         : '70px',
							display        : 'flex',
							justifyContent : 'space-between',
						}}
						>
							<div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginRight: '4px' }}>
								<p style={{ fontSize: 10, margin: 0 }}>Port of Discharge</p>
								<TextAreaController
									name="port_of_discharge"
									control={control}
									defaultValue={port_of_discharge}
								/>
							</div>
							<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
								<p style={{ fontSize: 10, margin: 0 }}>Place of Delivery</p>
								<TextAreaController
									name="place_of_delivery"
									control={control}
								/>
							</div>
						</div>
						<div style={{
							borderBottom   : '1px solid black',
							borderTop      : '1px solid black',
							padding        : '8px',
							height         : '70px',
							display        : 'flex',
							justifyContent : 'space-between',
						}}
						>
							<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
								<p style={{ fontSize: 10, margin: 0 }}>Vessel &amp; Voyage No.</p>
								<TextAreaController
									name="vessel_number"
									control={control}
								/>
							</div>
						</div>

					</div>

					<div style={{ border: '1px solid black', width: '48%' }}>
						<div style={{
							borderBottom   : '1px solid black',
							padding        : '8px',
							height         : '50px',
							display        : 'flex',
							flexDirection  : 'column',
							alignItems     : 'center',
							justifyContent : 'center',
						}}
						>
							<p style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>
								BILL OF LADING

							</p>
							<p style={{ fontSize: '10px', fontWeight: 700, margin: 0 }}>
								OR MULTIMODAL TRANSPORT DOCUMENT

							</p>
							<p style={{ fontSize: '10px', fontWeight: 700, margin: 0 }}>
								FMC NO: 028985

							</p>
						</div>
						<div style={{
							borderBottom   : '1px solid black',
							borderTop      : '1px solid black',
							padding        : '8px',
							height         : '38px',
							display        : 'flex',
							justifyContent : 'space-between',
						}}
						>
							<p style={{ fontSize: '16px', margin: 0 }}>Bill of Lading No.</p>
							<b> BL0423003182</b>
						</div>
						<div style={{
							borderBottom  : '1px solid black',
							borderTop     : '1px solid black',
							padding       : '8px',
							height        : '55%',
							display       : 'flex',
							flexDirection : 'column',
							alignItems    : 'center',
						}}
						>
							<img
								// eslint-disable-next-line max-len
								src="https://cogoport-production.sgp1.digitaloceanspaces.com/6f67ac5379afb6694a75e573407899f2/bluetidelogo.png"
								alt="Bluetide Logo"
								height="20px"
							/>
							<span style={{ fontSize: '14px', fontWeight: 700, lineHeight: 1.4 }}>
								BLUETIDE ESERVICES PVT. LTD.

							</span>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>
								Complex, Old Delhi Gurgaon Road, Gurgaon

							</span>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>
								Building No. 1, Shop No 7, Natraj

							</span>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>
								Haryana - 122001

							</span>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>
								Tel No: 43708987 Fax No: 43708988

							</span>
							<span style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.4 }}>
								Rge No:MTO/DGS/2274/DEC/2023

							</span>
							<p style={{ fontSize: '8px', fontWeight: 400, lineHeight: 1.4 }}>
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
						<div style={{ padding: '8px', borderTop: '1px solid black', height: '100%' }}>
							<p style={{ fontSize: '10px', margin: '0' }}>For delivery of goods please apply to:</p>
							<TextAreaController
								name="goods_delivery_contact"
								control={control}
								rows={7}
							/>
						</div>
					</div>
				</div>

				<div style={{
					border        : '2px solid black',
					display       : 'flex',
					flexDirection : 'column',
					alignItems    : 'center',
					borderTop     : 'none',
				}}
				>
					<table>
						<thead>
							<tr>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									Container No.

								</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									Marks and No.

								</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									Number of Packages, kinds of packages, general description of goods

								</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>Gross Weight</th>
								<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>Measurement</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center', width: '25%' }}>
									<TextAreaController
										name="container_number"
										control={control}
										rows={10}
									/>
								</td>
								<td style={{
									fontSize   : '10px',
									fontWeight : 400,
									textAlign  : 'center',
								}}
								>
									<TextAreaController
										name="marks_and_number"
										control={control}
										rows={10}
									/>

								</td>
								<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center', width: '40%' }}>
									<TextAreaController
										name="package_description"
										control={control}
										rows={10}
									/>
								</td>
								<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									<TextAreaController
										name="gross_weight"
										control={control}
										rows={10}
									/>
								</td>
								<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>
									<TextAreaController
										name="measurement"
										control={control}
										rows={10}
									/>
								</td>
							</tr>
						</tbody>
					</table>
					<span style={{ fontSize: '10px', lineHeight: 1.4, padding: 8, marginTop: 8 }}>
						Particulars above furnished by consignee/consignor

					</span>
				</div>

				<div style={{ border: '1px solid black', display: 'flex', height: '55px' }}>
					<div style={{
						border        : '1px solid black',
						borderTop     : 'none',
						borderBottom  : 'none',
						padding       : '6px',
						flex          : 1,
						display       : 'flex',
						flexDirection : 'column',
					}}
					>
						<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>Freight Terms</span>
						<TextAreaController
							name="freight_amount"
							control={control}
						/>
					</div>
					<div style={{
						border        : '1px solid black',
						borderTop     : 'none',
						borderBottom  : 'none',
						padding       : '6px',
						flex          : 1,
						display       : 'flex',
						flexDirection : 'column',
					}}
					>
						<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>Freight Payable At</span>
						<TextAreaController
							name="freight_payable_at"
							control={control}
						/>
					</div>
					<div style={{
						border        : '1px solid black',
						borderTop     : 'none',
						borderBottom  : 'none',
						padding       : '6px',
						flex          : 1,
						display       : 'flex',
						flexDirection : 'column',
					}}
					>
						<span style={{
							fontSize   : '10px',
							fontWeight : 400,
							lineHeight : 1.4,
						}}
						>
							Number of original MTD(s)

						</span>
						<TextAreaController
							name="number_of_original_MTDs"
							control={control}
						/>
					</div>
					<div style={{
						border        : '1px solid black',
						borderTop     : 'none',
						borderBottom  : 'none',
						padding       : '6px',
						flex          : 1,
						display       : 'flex',
						flexDirection : 'column',
					}}
					>
						<span style={{
							fontSize   : '10px',
							fontWeight : 400,
							lineHeight : 1.4,
						}}
						>
							Place and date of issue

						</span>
						<TextAreaController
							name="place_and_date_of_issue"
							control={control}
						/>
					</div>
				</div>

				<div style={{
					border         : '2px solid black',
					borderTop      : '1px solid',
					height         : '70px',
					display        : 'flex',
					justifyContent : 'space-between',
					padding        : '4px',
				}}
				>
					<div style={{ display: 'flex', justifyContent: 'space-between' }}>
						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4' }}>
								Other Particulars (if any)
								<TextAreaController
									name="other_particulars"
									control={control}
									rows={1}
								/>
							</span>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4' }}>
								(TERMS CONTINUED ON BACK HEREOF)

							</span>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', marginLeft: '30px' }}>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4' }}>
								Weight and measurement of container not to be included

							</span>
							<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4' }}>
								(TERMS CONTINUED ON BACK HEREOF)

							</span>
						</div>
					</div>
					<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4', marginRight: '8px' }}>
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
