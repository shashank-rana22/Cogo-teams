import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from '@cogoport/next';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import useApproveQuotation from '../../../../hook/useApproveQuotation';
import RaiseTicketModal from '../../RaiseTicketModal';

import Body from './Body';
import Header from './Header';
import styles from './styles.module.css';

const ZERO_VALUE = 0;

function Content({
	data = [],
	loading = false,
	shipment_id = '',
	income = '',
	profitability = '',
	source = '',
	type = '',
	getClosedTasks = () => {},
}) {
	const { query: { job_number = '' } } = useRouter();

	const [lineItemSectionOpen, setLineItemSectionOpen] = useState({});
	const [showTicketModal, setShowTicketModal] = useState(false);

	const approvedIdList = data?.filter((item) => item?.quotation_state === 'APPROVED').map((item) => item?.id);
	const initIdList = data?.filter((item) => item?.quotation_state === 'INIT').map((item) => item?.id);
	const currentStatus = data?.some((item) => item?.quotation_state === 'INIT');
	const auditStatus = window.sessionStorage.getItem('audit_status');
	const currency = window.sessionStorage.getItem('currency');

	const {
		approveQuotation = () => {},
	} = useApproveQuotation({
		idList : (currentStatus ? initIdList : approvedIdList),
		status : (currentStatus ? 'APPROVED' : 'INIT'),
		type,
	});

	return (
		<div className={styles.overall_container}>
			<div className={styles.stats_container}>
				<div className={styles.individual_stat_container}>
					<div className={styles.regular}>
						{type === 'buy' ? 'Expense: ' : 'Income: '}
					</div>
					<div>
						{formatAmount({
							amount  : income,
							currency,
							options : {
								currencyDisplay : 'code',
								style           : 'currency',
							},
						})}
					</div>
				</div>
				<div className={styles.income}>
					<div className={styles.regular}>Profitability</div>
					<div className={`${profitability > ZERO_VALUE ? styles.green : styles.red}`}>
						{`${profitability}%`}
					</div>
				</div>
			</div>
			{!isEmpty(data) ? (
				<div>
					<Header />
					{data?.map((item) => (
						<Body
							key={item?.id}
							lineItemSectionOpen={lineItemSectionOpen}
							setLineItemSectionOpen={setLineItemSectionOpen}
							data={item}
							loading={loading}
							source={source}
							type={type}
						/>
					))}
					{currentStatus && auditStatus !== 'audited' ? (
						<div className={styles.buttons_container}>
							<Button
								size="md"
								themeType="secondary"
								style={{ marginRight: '10px' }}
								onClick={setShowTicketModal}
							>
								Raise Ticket
							</Button>

							{ showTicketModal ? (
								<RaiseTicketModal
									setShowTicketModal={setShowTicketModal}
									shipment_id={shipment_id}
									showTicketModal={showTicketModal}
									itemData={data}
									id={job_number}
									refetch={getClosedTasks}
								/>
							) : null}

							<Button
								size="md"
								themeType="primary"
								onClick={() => approveQuotation(getClosedTasks)}
							>
								Accept
							</Button>
						</div>
					) : null}

					{!currentStatus && auditStatus !== 'audited' ? (
						<div className={styles.buttons_container}>
							<Button
								size="md"
								themeType="primary"
								onClick={() => approveQuotation(getClosedTasks)}
							>
								Undo
							</Button>
						</div>
					) : null}
				</div>
			) : null}
		</div>
	);
}

export default Content;
