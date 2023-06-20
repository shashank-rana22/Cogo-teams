function BottomData({ stampData }) {
	return (
		<>
			<tr>
				<td
					colSpan="13"
					style={{
						textAlign     : 'left',
						borderWidth   : '1px 1px 0 0',
						borderStyle   : 'solid',
						fontSize      : '12px',
						padding       : '0px 8px',
						verticalAlign : 'top',
						maxWidth      : '50%',
					}}
				>
					<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>Remarks:</h4>

					<br />
				</td>
			</tr>
			<tr style={{ height: '200px' }}>
				<td
					style={{
						textAlign     : 'left',
						width         : '65%',
						borderWidth   : '1px 1px 0 0',
						borderStyle   : 'solid',
						fontSize      : '12px',
						padding       : '0px 8px',
						verticalAlign : 'top',
						maxWidth      : '50%',
					}}
				>
					<div
						style={{
							height         : '200px',
							display        : 'flex',
							flexDirection  : 'column',
							justifyContent : 'space-between',
						}}
					>
						<div>
							<h4 style={{ margin: '0', marginTop: '5px', marginBottom: '5px' }}>Notes :</h4>
							<br />

							<p style={{ margin: '3px 0', fontSize: '12px' }}>
								1. Delayed Payment Penalty: 2% per month or part there of from
								the date of invoice.
								<br />
								2. Any part payment made against this invoice shall be treated
								as on Account, unless the amount of invoice is paid in full.
								<br />
								3. Payment advice should be mailed to collection@4tigo.com
								<br />
								4. Disputes, if any shall be subject to Jurisdiction of Courts
								of Bangalore only.
							</p>
						</div>
						<div />
						<div />
					</div>
				</td>
				<td
					style={{
						width       : '35%',
						textAlign   : 'center',
						height      : '200px',
						borderWidth : '1px 1px 0 0',
						borderStyle : 'solid',
						fontSize    : '12px',
						borderColor : 'black',
						padding     : '0px 8px',
					}}
				>
					<img
						src={stampData}
						style={{ textAlign: 'right', height: '50%' }}
						alt="Cogoport"
					/>
					<br />
					<br />
					<b>Authorized Signatory</b>
					<br />
					<br />
				</td>
			</tr>
		</>
	);
}
export default BottomData;
