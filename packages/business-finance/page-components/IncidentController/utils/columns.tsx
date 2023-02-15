import { Tooltip } from '@cogoport/components';
import { startCase } from '@cogoport/utils';

import BankDetails from '../Modals/BankDetails';
import ICJVModal from '../Modals/ICJV_Modal';
import JvModal from '../Modals/JvModal';
import RequestCN from '../Modals/RequestCN';
import SettlementModal from '../Modals/SettlementModal';
import TDSModal from '../Modals/TDSModal';

import { TooltipInterface } from './interface';
import SortIcon from './SortIcon';
import styles from './styles.module.css';

export const columns = ({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData, activeTab }) => {
	const toTitleCase = (str:string) => {
		const titleCase = str
			.toLowerCase()
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');

		return titleCase;
	};

	return [
		{
			Header   : 'INCIDENT ID',
			accessor : 'incident_id',
			id       : 'incident_id',
			Cell     : ({ row: { original } }) => {
				const { referenceId = {} } = original || {};
				return <span className={styles.incident_id}>{ referenceId }</span>;
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
						theme="light"
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
							theme="light"
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
				return <span>{name}</span>;
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
							: toTitleCase(requestType.replace(/_/g, ' '))}
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
			accessor : 'createdAt',
			id       : 'request_date',
		},
		{
			Header   : activeTab === 'approved' ? 'APPROVED BY & ON' : 'REJECTED BY & ON',
			accessor : 'updatedBy',
			id       : 'username',
			Cell     : ({ row: { original } }) => {
				const { updatedBy = {}, updatedAt } = original || {};
				const { name = '' } = updatedBy || {};
				return (
					<div className={styles.flex_reverse}>
						<div>{name}</div>
						<div>{updatedAt}</div>
					</div>
				);
			},
		},
		{
			Header   : 'REMARK',
			accessor : 'remark',
			id       : 'remark',
			Cell     : ({ row: { original } }) => {
				const { remark = '' } = original || {};
				return (
					<Tooltip
						theme="light"
						content={<div className={styles.tooltip}>{remark}</div>}
					>
						<div className={styles.remark}>{remark}</div>
					</Tooltip>
				);
			},
		},

		{
			accessor: (row:any) => {
				const {
					tdsRequest,
					bankRequest,
					organization,
					settlementRequest,
					journalVoucherRequest,
					interCompanyJournalVoucherRequest,
				} = row.data || {};

				const { type: requestType, id, remark, status } = row || {};

				return (
					<>
						{requestType === 'TDS_APPROVAL' && (
							<TDSModal
								tdsData={tdsRequest}
								id={id}
								refetch={getIncidentData}
								isEditable={false}
								row={row}
							/>
						)}
						{requestType === 'SETTLEMENT_APPROVAL' && (
							<SettlementModal
								settlementData={settlementRequest}
								id={id}
								row={row}
								refetch={getIncidentData}
								isEditable={false}
							/>
						)}
						{requestType === 'JOURNAL_VOUCHER_APPROVAL' && (
							<JvModal
								journalVoucherRequest={journalVoucherRequest}
								id={id}
								row={row}
								refetch={getIncidentData}
								isEditable={false}
							/>
						)}
						{requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' && (
							<ICJVModal
								interCompanyJournalVoucherRequest={
								interCompanyJournalVoucherRequest
								}
								row={row}
								refetch={getIncidentData}
								isEditable={false}
								id={id}
							/>
						)}
						{requestType === 'BANK_DETAIL_APPROVAL' && (
							<BankDetails
								bankData={bankRequest}
								bankId={id}
								row={row}
								organization={organization}
								refetch={getIncidentData}
								isEditable={false}
								remark={remark}
							/>
						)}

						{requestType === 'ISSUE_CREDIT_NOTE' && (
							<RequestCN
								row={row}
								refetch={getIncidentData}
								id={id}
								isEditable={false}
								status={status}
							/>
						)}

						{requestType === 'CONSOLIDATED_CREDIT_NOTE' && (
							<RequestCN
								row={row}
								refetch={getIncidentData}
								id={id}
								isEditable={false}
								status={status}
							/>
						)}

					</>
				);
			},
			id: 'actionColumn',
		},
	];
};
