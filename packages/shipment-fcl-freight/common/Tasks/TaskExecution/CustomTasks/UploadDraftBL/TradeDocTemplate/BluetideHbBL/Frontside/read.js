function Read({
	shipmentData = {},
}) {
	return (
		<section style={{ border: '1px solid black', width: '696px', position: 'relative', pageBreakAfter: 'auto' }}>
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
						<p style={{ fontSize: '10px', margin: '0', fontFamily: 'monospace, monospace' }}>
							Consigner/Shipper

						</p>
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
						<p style={{ fontSize: '10px', margin: '0', fontFamily: 'monospace' }}>Consignee (or order)</p>
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
						<p style={{ fontSize: '10px', margin: '0', fontFamily: 'monospace' }}>Notify Address</p>
					</div>
					<div style={{
						borderBottom   : '1px solid black',
						borderTop      : '1px solid black',
						padding        : '8px',
						height         : '44px',
						display        : 'flex',
						justifyContent : 'space-between',
					}}
					>
						<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
							<p style={{ fontSize: '10px', margin: '0' }}>Place of Acceptance</p>
							<p style={{ fontSize: '10px', margin: '0', fontFamily: 'monospace' }}>ICD</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
							<p style={{ fontSize: '10px', margin: '0' }}>Port of Loading</p>
							<p style={{
								fontSize   : '10px',
								margin     : '0',
								fontFamily : 'monospace',
							}}
							>
								ICD Dadri (INDER), Delhi, India

							</p>
						</div>
					</div>
					<div style={{
						borderBottom   : '1px solid black',
						borderTop      : '1px solid black',
						padding        : 8,
						height         : 44,
						display        : 'flex',
						justifyContent : 'space-between',
					}}
					>
						<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
							<p style={{ fontSize: 10, margin: 0 }}>Port of Discharge</p>
							<p style={{ fontSize: 10, margin: 0 }}>ICD</p>
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
							<p style={{ fontSize: 10, margin: 0 }}>Place of Delivery</p>
							<p style={{
								fontSize   : 10,
								margin     : 0,
								fontFamily : 'monospace',
							}}
							>
								ICD Dadri (INDER), Delhi, India

							</p>
						</div>
					</div>
					<div style={{
						borderBottom   : '1px solid black',
						borderTop      : '1px solid black',
						padding        : 8,
						height         : 44,
						display        : 'flex',
						justifyContent : 'space-between',
					}}
					>
						<div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
							<p style={{ fontSize: 10, margin: 0 }}>Vessel &amp; Voyage No.</p>
							<p style={{ fontSize: 10, margin: 0 }}>IVessel &amp; Voyage No.CD</p>
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
						<p style={{ fontSize: '12px', fontWeight: 700, margin: 0 }}>BILL OF LADING</p>
						<p style={{ fontSize: '10px', fontWeight: 700, margin: 0 }}>OR MULTIMODAL TRANSPORT DOCUMENT</p>
						<p style={{ fontSize: '10px', fontWeight: 700, margin: 0 }}>FMC NO: 028985</p>
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
						<p style={{ fontSize: '10px', fontWeight: '700', margin: '0' }}>Answer</p>
					</div>
				</div>
			</div>

			<div style={{ border: '1px solid black', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<table>
					<thead>
						<tr>
							<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>Container No.</th>
							<th style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>Marks and No.</th>
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
								CONTAINER:
								MRKU7725815/20'

								SEAL:
								IN0216431

								CUSTOM:
								175079

							</td>
							<td style={{
								fontSize   : '10px',
								fontWeight : 400,
								textAlign  : 'center',
							}}
							>
								01 TO 20 PACKAGES

							</td>
							<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center', width: '40%' }}>
								SAID TO CONTAIN:
								1X20FT CONTAINER CONTAINING:
								Total Packages: 20 pkg
								SUB;DI; 1.5;5S; NO. EF.
								Part No. P27493
								Drawing No. 1113-310
								Silicone Rubber Insulators
								P.O No.OP36663 REV1 DT 02.12.2022 quantity : 3240 Nos
								01/20 to 20/20
								INV NO: OGL/22-23/EX120 Date: 31.03.2023
								SB no – 8967744 dt:31.01.2023
								**Notify 2:
								MPS -YORK
								7801 Park Place RD
								York SC 29745
								803 628 2100

							</td>
							<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>7300 KGS</td>
							<td style={{ fontSize: '10px', fontWeight: 400, textAlign: 'center' }}>FCL/FCL</td>
						</tr>
					</tbody>
				</table>
				<span style={{ fontSize: '10px', lineHeight: 1.4, padding: 8, marginTop: 8 }}>
					Particulars above furnished by consignee/consignor

				</span>
			</div>

			<div style={{ border: '1px solid black', display: 'flex', height: '40px' }}>
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
					<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>Prepaid</span>
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
					<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>24829.24</span>
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
					<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>4</span>
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
					<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>Place and date of issue</span>
					<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: 1.4 }}>Gurgaon, 24 April, 2023</span>
				</div>
			</div>

			<div style={{
				border         : '2px solid black',
				borderTop      : '1px solid',
				height         : '42px',
				display        : 'flex',
				justifyContent : 'space-between',
				padding        : '4px',
			}}
			>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						<span style={{ fontSize: '10px', fontWeight: 400, lineHeight: '1.4' }}>
							Other Particulars (if any)

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
		</section>
	);
}

export default Read;
