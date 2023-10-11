import { Button } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useRouter } from 'next/router';
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
	income = '',
	profitability = '',
	source = '',
	type = '',
	id = '',
}) {
	const { query: { job_number = '' } } = useRouter();

	const [lineItemSectionOpen, setLineItemSectionOpen] = useState({});
	const [showTicketModal, setShowTicketModal] = useState(false);

	const {
		approveQuotation = () => {},
	} = useApproveQuotation({ id, status: 'APPROVED' });

	return (
		<div className={styles.overall_container}>
			<div className={styles.stats_container}>
				<div className={styles.individual_stat_container}>
					<div className={styles.regular}>Income</div>
					<div>
						{formatAmount({
							amount   : income,
							currency : 'INR',
							options  : {
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
			<Header />
			{data.map((item) => (
				<Body
					key={item.id}
					lineItemSectionOpen={lineItemSectionOpen}
					setLineItemSectionOpen={setLineItemSectionOpen}
					data={item}
					loading={loading}
					source={source}
					type={type}
				/>
			))}
			<div className={styles.buttons_container}>
				<Button
					size="md"
					themeType="secondary"
					style={{ marginRight: '10px' }}
					onClick={setShowTicketModal}
				>
					Raise Ticket
				</Button>

				{
						showTicketModal ? (
							<RaiseTicketModal
								setShowTicketModal={setShowTicketModal}
								showTicketModal={showTicketModal}
								itemData={data}
								id={job_number}
							/>
						) : null
					}

				<Button
					size="md"
					themeType="primary"
					onClick={approveQuotation}
				>
					Accept
				</Button>
			</div>
		</div>
	);
}

export default Content;
