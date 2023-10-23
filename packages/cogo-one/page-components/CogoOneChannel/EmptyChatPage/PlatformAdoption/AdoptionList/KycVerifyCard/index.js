import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAIncoterms, IcMOverflowDot, IcMInfo, IcMDocument, IcMTimer, IcMFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import { formatAccountType } from '../../../../../../utils/platformAdoption';

import styles from './styles.module.css';

const DOC_ARRAY = ['Pan.pdf', 'GST.pdf', 'Aadhar.pdf', 'Income.pdf'];

function KycVerifyCard({ list = [], setVerifyAccount = () => {}, handlePlaceCall = () => {} }) {
	const FIRST_TWO_ITEM = DOC_ARRAY.slice(0, 2);
	const REMAINING_ITEM = DOC_ARRAY.slice(2);

	return (list || []).map((item) => {
		const {
			organization = {}, request_type = '', id = '', requesting_user = {}, performed_by_type = '',
			updated_at = '', customer = {},
		} = item || {};
		const { account_type = '', business_name = '', tags = [], organization_documents = [] } = organization || {};
		const { name = '' } = requesting_user || {};
		const {
			name:pocName = '', mobile_country_code = '', mobile_number = '', id: pocId = '',
			lead_user_id = '',
		} = customer || {};

		return (
			<div className={styles.card} key={id}>
				<div className={styles.header_info}>
					<div className={styles.user_info}>
						<IcAIncoterms />
						<div className={styles.org_details}>
							<Tooltip
								content={startCase(business_name)}
								placement="top"
							>
								<div className={styles.business_name}>
									{startCase(request_type) || '-'}
								</div>
							</Tooltip>
							<div className={styles.lower_section}>
								<div className={styles.trade_name}>
									{startCase(business_name) || '-'}
								</div>
								<div className={styles.account_type}>
									{formatAccountType({ tags })?.[account_type]?.shortName}
								</div>
							</div>
						</div>
					</div>
					<div className={styles.action}>
						<IcMInfo className={styles.info_icon} />
						<IcMOverflowDot className={styles.dot_icon} />
					</div>

				</div>
				<div className={styles.body_info}>
					<div className={styles.each_row}>
						<div className={styles.title}>Documents Uploaded :</div>
						<div className={styles.docs_container}>
							<div className={styles.wrap}>
								{FIRST_TWO_ITEM.map((it) => (
									<div className={styles.each_doc} key={it}>
										<IcMFtick width={16} height={16} fill="#abcd62" />
										{/* <Tooltip placement="top" content={it}> */}
										<div className={styles.doc_name}>
											{it}
										</div>
										{/* </Tooltip> */}
									</div>
								))}
							</div>
							{DOC_ARRAY.length > 2 ? (
								<div className={styles.remaining_content}>
									<div className={styles.remian_count}>{`+${REMAINING_ITEM.length} more`}</div>
									<div
										role="presentation"
										className={styles.view_all}
										onClick={() => {
											setVerifyAccount((prev) => ({
												...prev,
												show               : true,
												showAccountDetails : false,
												accountData        : organization_documents,
												orgData            : {},
												verifyType         : '',
												accountType        : '',
											}));
										}}
									>
										<IcMDocument width={15} height={15} />
										<span>View All</span>
									</div>
								</div>
							) : null}
						</div>
					</div>
					<div className={styles.each_row}>
						<div className={styles.title}>Requsted By :</div>
						<div className={styles.request_name}>
							{startCase(name)}
							<div className={styles.role}>{startCase(performed_by_type)}</div>
							<div className={styles.role}>
								{formatDate({
									date       : updated_at,
									dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
									timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
									formatType : 'dateTime',
									separator  : ' | ',
								})}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.line_break} />
				<div className={styles.footer_info}>
					<div className={styles.time_left}>
						<IcMTimer width={20} height={20} fill="#F37166" />
						10:09 m left
					</div>
					<div className={styles.button_section}>
						<div
							className={styles.verify_button}
							role="presentation"
							onClick={() => {
								setVerifyAccount((prev) => ({
									...prev,
									show               : true,
									showAccountDetails : true,
									accountData        : organization_documents,
									orgData            : item,
									verifyType         : 'kyc_verify',
									accountType        : formatAccountType({ tags })?.[account_type]?.shortName,
								}));
							}}
						>
							<IcMFtick className={styles.ftick_icon} />
							Verify
						</div>
						<div
							role="presentation"
							className={styles.call_icon}
							onClick={() => handlePlaceCall({
								userName   : pocName,
								code       : mobile_country_code,
								number     : mobile_number,
								pocId,
								leadUserId : lead_user_id,
							})}
						>
							<IcMCall width={18} height={18} fill="#fff" />
						</div>
					</div>
				</div>
			</div>
		);
	});
}

export default KycVerifyCard;
