import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { IcMEdit } from '@cogoport/icons-react';
import { useState } from 'react';

import { GenericObject } from './Interfaces/index';
import PayablesEditModal from './PayablesEditModal';
import ReceivablesEditModal from './ReceivablesEditModal';
import styles from './styles.module.css';

interface TdsStyleInterface {
	rate?:number,
	style?:string,
	type?:string
}
interface DataInterfaces {
	orgName?:string,
	currency?:string,
	outstanding?:string | number,
	tdsStyle?:TdsStyleInterface,
}
interface Props {
	active?:string,
	approveTds?:any,
	globalFilters?:GenericObject,
	data?:DataInterfaces,
	editTdsLoading?:boolean
}

function TdsSingleCard({
	globalFilters,
	active,
	data = {},
	editTdsLoading,
	approveTds,
}:Props) {
	const [show, setShow] = useState(false);
	const onClick = () => {
		setShow(true);
	};

	const {
		orgName = '',
		currency = '',
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
						<Tooltip
							placement="top"
							caret={false}
							content={orgName}
						>
							<div className={styles.company_name}>{`${orgName?.substring(0, 25)}..` || ''}</div>
						</Tooltip>
					) : (
						<div className={styles.company_name}>{orgName || ''}</div>
					)}
				</div>
			</div>
			<div>
				<div className={styles.text}>Outstanding </div>
				<div className={styles.amount}>
					{ outstanding ? getFormattedPrice(outstanding || '', currency) : '-'}
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
					<ReceivablesEditModal
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
