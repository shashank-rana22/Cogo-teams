import { isEmpty } from '@cogoport/utils';

import { CUSTOMER_TO_ENTERPRISE_TYPE_MAPPING } from '../../../utils/serviceDescriptionMappings';
import { getOtherData } from '../getOtherData';

function BottomData({ stampData = '', billing_address = {}, customData = {} }) {
	const { kind_attention = '' } = getOtherData({ customData });
	const {
		business_name = '',
		registration_number = '',
		branch_city = '',
		payment_email = '',
		is_required_for_fortigo = true,
	} = billing_address || {};
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
					<div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
						<h4><b>Remarks:</b></h4>
						<p style={{ marginLeft: '10px' }}>{kind_attention}</p>
					</div>

					<br />
				</td>
			</tr>
			<tr>
				{is_required_for_fortigo ? (
					<td
						colSpan="13"
						style={{
							fontSize    : '16px',
							textAlign   : 'center',
							fontWeight  : '600',
							borderWidth : '1px 1px 0 0',
							borderStyle : 'solid',
						}}
					>
						{CUSTOMER_TO_ENTERPRISE_TYPE_MAPPING[registration_number] || ''}
					</td>
				) : null}
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
							{(is_required_for_fortigo || isEmpty(customData?.terms_and_conditions)) ? (
								<p style={{ margin: '3px 0', fontSize: '12px' }}>
									1. Delayed Payment Penalty: 2% per month or part there of from
									the date of invoice.
									<br />
									2. Any part payment made against this invoice shall be treated
									as on Account, unless the amount of invoice is paid in full.
									<br />
									3. Payment advice should be mailed to
									{' '}
									{payment_email}
									<br />
									4. Disputes, if any shall be subject to Jurisdiction of Courts
									of
									{' '}
									{branch_city}
									{' '}
									only.
								</p>
							) : (
								<div
									dangerouslySetInnerHTML={{
										__html: customData?.terms_and_conditions,
									}}
								/>
							)}

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
					<h3>
						<b>
							for
							{' '}
							{business_name}
						</b>
					</h3>
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
