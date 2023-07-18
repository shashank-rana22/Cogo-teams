import { Tooltip, Pill } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import { TooltipInterface } from '../utils/interface';
import { toTitleCase } from '../utils/titleCase';

import AccessorComponent from './AccessorComponent';
import SortIcon from './SortIcon';
import styles from './styles.module.css';

export const columns = ({ setIsAscendingActive, setFilters, isAscendingActive, getIncidentData, activeTab }) => [
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
					interactive
					content={(list || [{}]).map((item:TooltipInterface) => (
						<div className={styles.trade_party_name} key={item?.id}>
							<div>{toTitleCase(item?.div || '-')}</div>
						</div>
					))}
				>
					<div className={styles.wrapper}>{getList()[GLOBAL_CONSTANTS.zeroth_index]}</div>
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
			return <span>{name}</span>;
		},
	},
	{
		Header   : 'REQUEST TYPE',
		accessor : 'type',
		id       : 'request_type',
		Cell     : ({ row: { original } }) => {
			const { type: requestType = '', data } = original || {};

			const { creditNoteRequest } = data || {};

			const { revoked } = creditNoteRequest || {};
			return (
				<div className={styles.credit}>
					<span>
						{ requestType === 'INTER_COMPANY_JOURNAL_VOUCHER_APPROVAL' ? <span>ICJV Approval </span>
							: toTitleCase(requestType ? startCase(requestType) : '-')}

					</span>
					<span>
						{typeof (revoked) === 'boolean' && (
							<div>
								{revoked
									? <Pill size="md" color="#C4DC91">Fully</Pill>
									: <Pill size="md" color="#FEF199">Partial</Pill>}
							</div>
						)}
					</span>
				</div>

			);
		},
	},
	{
		Header   : 'REQUEST SUB TYPE',
		accessor : 'incidentSubtype',
		id       : 'request_sub_type',
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
					{formatDate({
						date: createdAt,
						dateFormat:
							GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'date',
					})}
					<div>
						{formatDate({
							date: createdAt,
							timeFormat:
								GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
							formatType: 'time',
						})}
					</div>
				</div>
			);
		},
		id: 'request_date',
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
					{formatDate({
						date: updatedAt,
						dateFormat:
							GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
						timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm aaa'],
						formatType : 'dateTime',
						seperator  : ' ',
					})}
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
					content={<div className={styles.tooltip}>{remark}</div>}
				>
					<div className={styles.remark}>{remark}</div>
				</Tooltip>
			);
		},
	},

	{
		accessor: (row:any) => (
			<AccessorComponent row={row} getIncidentData={getIncidentData} />
		),
		id: 'actionColumn',
	},
];
