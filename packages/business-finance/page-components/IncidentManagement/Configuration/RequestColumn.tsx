import { Tooltip } from '@cogoport/components';
import { format, startCase } from '@cogoport/utils';

import BankDetails from '../Modals/BankDetails';
import ConcorModal from '../Modals/ConcorModal';
import ICJVModal from '../Modals/ICJV_Modal';
import JvModal from '../Modals/JvModal';
import RequestCN from '../Modals/RequestCN';
import SettlementModal from '../Modals/SettlementModal';
import SezApproval from '../Modals/SezApproval';
import TDSModal from '../Modals/TDSModal';
import { TooltipInterface } from '../utils/interface';
import { toTitleCase } from '../utils/titleCase';

import SortIcon from './SortIcon';
import styles from './styles.module.css';

export const requestColumn = ({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData }) => [
	{
		Header   : 'INCIDENT ID',
		accessor : 'incident_id',
		id       : 'incident_id',
		Cell     : ({ row: { original } }) => {
			const { referenceId = {} } = original || {};
			return <span className={styles.incident_id}>{ referenceId || '-' }</span>;
		},
	},
	{
		Header   : 'COMPANY NAME',
		accessor : 'company_name',
		id       : 'company_name',
		Cell     : ({ row: { original } }) => {
			const { data = {} } = original || {};
			const { organization = '' } = data || {};
			const { interCompanyJournalVoucherRequest } = data || {};
			const { list } = interCompanyJournalVoucherRequest || {};
			const getList = () => (list || [{}]).map((item:TooltipInterface) => item?.tradePartyName);
			const bankTradePartyName = data?.bankRequest
					&& data?.organization?.tradePartyType;
			const tdsTradePartyName = data?.tdsRequest
				&& data?.organization?.tradePartyType;

			return list ? (
				<Tooltip
					interactive
					content={(list || [{}]).map((item:TooltipInterface) => (
						<div className={styles.trade_party_name}>
							<div>{toTitleCase(item?.div || '-')}</div>
						</div>
					))}
				>
					<div className={styles.wrapper}>{getList()[0]}</div>
				</Tooltip>
			) : (
				<div>

					<Tooltip
						interactive
						content={bankTradePartyName || tdsTradePartyName ? (
							<div>
								{(organization?.tradePartyType === 'SELF'
									? organization?.businessName : organization?.tradePartyName)
									|| toTitleCase(organization?.businessName || '-')}

							</div>
						) : (
							<div>{toTitleCase(organization?.businessName || '-')}</div>
						)}
					>
						{bankTradePartyName || tdsTradePartyName ? (
							<div className={styles.wrapper}>
								{(organization?.tradePartyType === 'SELF'
									? organization?.businessName : organization?.tradePartyName)
									|| toTitleCase(organization?.businessName || '-')}

							</div>
						) : (
							<div className={styles.wrapper}>{toTitleCase(organization?.businessName || '-')}</div>
						)}
					</Tooltip>

				</div>
			);
		},
	},
	{
		Header   : 'REQUESTED BY',
		accessor : 'requested_by',
		id       : 'requested_by',
		Cell     : ({ row: { original } }) => {
			const { createdBy = {} } = original || {};
			const { name = '' } = createdBy || {};
			return <span>{name || '-'}</span>;
		},
	},
	{
		Header   : 'REQUEST TYPE',
		accessor : 'type',
		id       : 'request_type',
		Cell     : ({ row: { original } }) => {
			const { type: requestType = '' } = original || {};
			return (
				<span>
					{ requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? <span>ICJV Approval </span>
						: toTitleCase(requestType.replace(/_/g, ' ') || '-')}
				</span>
			);
		},
	},
	{
		Header   : 'SOURCE',
		accessor : 'source',
		id       : 'source',
		Cell     : ({ row: { original } }) => {
			const { source = '' } = original || {};
			return <span>{startCase(source || '-')}</span>;
		},
	},
	{
		Header: () => (
			<div className={styles.flex}>
				REQUEST DATE
				<SortIcon
					setIsAscendingActive={setIsAscendingActive}
					setFilters={setFilters}
					isAscendingActive={isAscendingActive}
				/>
			</div>
		),
		accessor: (row) => {
			const { createdAt } = row;
			return (
				<div>
					{format(createdAt, 'dd MMM YYYY', {}, false)}
					<div>{format(createdAt, 'hh:mm a', {}, false)}</div>
				</div>
			);
		},
		id: 'request_date',
	},
	{
		accessor: (row) => {
			const { data } = row || {};
			const {
				tdsRequest,
				bankRequest,
				organization,
				settlementRequest,
				journalVoucherRequest,
				interCompanyJournalVoucherRequest,
				concorPdaApprovalRequest,
				sezRequest,
			} = data || {};

			const { type, id } = row || {};

			return (
				<>
					{type === 'TDS_APPROVAL' && (
						<TDSModal
							tdsData={tdsRequest}
							id={id}
							refetch={getIncidentData}
							row={row}
						/>
					)}
					{type === 'SETTLEMENT_APPROVAL' && (
						<SettlementModal
							settlementData={settlementRequest}
							id={id}
							row={row}
							refetch={getIncidentData}
						/>
					)}
					{type === 'BANK_DETAIL_APPROVAL' && (
						<BankDetails
							bankData={bankRequest}
							bankId={id}
							organization={organization}
							refetch={getIncidentData}
							row={row}
						/>
					)}
					{type === 'ISSUE_CREDIT_NOTE' && (
						<RequestCN row={row} refetch={getIncidentData} id={id} />
					)}

					{type === 'CONSOLIDATED_CREDIT_NOTE' && (
						<RequestCN row={row} refetch={getIncidentData} id={id} />
					)}

					{type === 'JOURNAL_VOUCHER_APPROVAL' && (
						<JvModal
							journalVoucherRequest={journalVoucherRequest}
							id={id}
							refetch={getIncidentData}
							row={row}
						/>
					)}

					{type === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' && (
						<ICJVModal
							interCompanyJournalVoucherRequest={
							interCompanyJournalVoucherRequest
								}
							row={row}
							refetch={getIncidentData}
							id={id}
						/>
					)}

					{
						type === 'CONCOR_PDA_APPROVAL' && (
							<ConcorModal
								concorData={concorPdaApprovalRequest}
								id={id}
								refetch={getIncidentData}
							/>
						)
					}
					{
						type === 'SEZ_APPROVAL' && (
							<SezApproval
								sezRequest={sezRequest}
								organization={organization}
								id={id}
								refetch={getIncidentData}
							/>
						)
					}

				</>
			);
		},
		id: 'action',
	},

	{
		Header   : '',
		id       : 'ribbon',
		accessor : (row:any) => {
			const { deadlineTag } = row;
			return (
				deadlineTag &&	(
					<div>
						{deadlineTag === 'RED' && (
							<div className={deadlineTag === 'RED' && styles.ribbon_red}>
								Urgent
							</div>
						)}
						{
								deadlineTag === 'ORANGE' && (
									<div className={deadlineTag === 'ORANGE' && styles.ribbon_orange}>
										Urgent
									</div>
								)
							}
					</div>
				)
			);
		},
	},
];
