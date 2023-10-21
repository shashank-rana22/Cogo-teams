import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { IcAIncoterms, IcMOverflowDot, IcMInfo, IcMDocument, IcMTimer, IcMFtick, IcMCall } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import styles from './styles.module.css';

const DOC_ARRAY = ['Pan.pdf', 'GST.pdf', 'Aadhar.pdf', 'Income.pdf'];

const ACCOUNT_TYPE_MAPPING = {
	importer_exporter : 'IE',
	service_provider  : 'SP',
	enterprise        : 'enterprise',
};

function KycVerifyCard({ list = [], setVerifyAccount = () => {} }) {
	const FIRST_TWO_ITEM = DOC_ARRAY.slice(0, 2);
	const REMAINING_ITEM = DOC_ARRAY.slice(2);

	return (list || []).map((item) => {
		const {
			organization = {}, request_type = '', id = '', requesting_user = {},
			performed_by_type = '', updated_at = '',
		} = item || {};
		const { account_type = '', business_name = '' } = organization || {};
		const { name = '' } = requesting_user || {};

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
									{startCase(ACCOUNT_TYPE_MAPPING?.[account_type])}
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
												accountData        : [],
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
									accountData        : [],
								}));
							}}
						>
							<IcMFtick className={styles.ftick_icon} />
							Verify
						</div>
						<div className={styles.call_icon}>
							<IcMCall width={18} height={18} fill="#fff" />
						</div>
					</div>
				</div>
			</div>
		);
	});
}

export default KycVerifyCard;
