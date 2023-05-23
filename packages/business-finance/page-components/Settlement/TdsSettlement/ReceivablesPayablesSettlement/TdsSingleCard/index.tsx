import { Tooltip } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import PayablesEditModal from './PayablesEditModal';
import ReceivavlesEditModal from './ReceivablesEditModal';
import styles from './styles.module.css';

const geo = getGeoConstants();

function TdsSingleCard({
	globalFilters,
	active,
	data = {},
	editTdsLoading,
	approveTds,
}) {
	const [show, setShow] = useState(false);
	const onClick = () => {
		setShow(true);
	};

	const {
		orgName = '',
		currency = geo.country.currency.code,
		outstanding = 0,
		tdsStyle = {},
	} = data || {};

	return (
		<div className={styles.card}>
			<div>
				<div className={styles.business_partner}>
					Business Partner
				</div>
				<div>
					{orgName?.length > 25 ? (
						<Tooltip maxWidth="none" theme="light" content={orgName}>
							<div className={styles.company_name}>{`${orgName.substring(0, 25)}..` || ''}</div>
						</Tooltip>
					) : (
						<div className={styles.company_name}>{orgName || ''}</div>
					)}
				</div>
			</div>
			<div>
				<div className={styles.text}>Outstanding </div>
				<div className={styles.amount}>
					{ formatAmount({
						amount   : outstanding || '',
						currency : geo.country.currency.code,
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 2,
						},
					})}
				</div>
			</div>

			<div>
				<div className={styles.text}>
					TDS Style
				</div>
				<div className={styles.amount}>
					{tdsStyle?.style || ''}
				</div>
			</div>
			<div>
				<div className={styles.tds_text}>
					TDS %
				</div>
				<div className={styles.tds_percentage}>
					{tdsStyle?.rate || '0'}
					%
					<IcMEdit onClick={onClick} />
				</div>
				{show && active === 'AR' ? (
					<ReceivavlesEditModal
						show={show}
						setShow={setShow}
						editTdsLoading={editTdsLoading}
						approveTds={approveTds}
						globalFilters={globalFilters}
						tdsStyle={tdsStyle}
					/>
				) : (
					<PayablesEditModal
						show={show}
						setShow={setShow}
						editTdsLoading={editTdsLoading}
						approveTds={approveTds}
						globalFilters={globalFilters}
					/>
				)}
			</div>
		</div>
	);
}

export default TdsSingleCard;
