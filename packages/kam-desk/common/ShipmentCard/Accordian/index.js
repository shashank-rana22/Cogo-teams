import { IcMArrowRotateDown, IcMArrowRotateUp } from '@cogoport/icons-react';
import { useState } from 'react';

import EwayTimer from './EwayTimer';
import styles from './styles.module.css';

function Accordian({ data = {} }) {
	const [open, setOpen] = useState(false);
	return (
		<>
			<div className={styles.accordian_bar}>
				{!open ? (
					<IcMArrowRotateDown
						style={{ marginBottom: '10px' }}
						onClick={() => setOpen(true)}
					/>
				) : (
					<IcMArrowRotateUp onClick={() => setOpen(false)} />
				)}
			</div>
			{open ? (
				<div className={styles.expand_details}>
					<div className={styles.sub_hedings}>
						<div>Eway Bill Number</div>
						<div>Eway Time Till Expiry(hrs)</div>
					</div>
					{(data?.expiring_eway_bills || []).map((item) => (
						<div key={item?.id} className={styles.details}>
							<div>{item?.eway_bill_number || '-'}</div>
							<div>
								<EwayTimer data={item?.ewb_validity} />
							</div>
						</div>
					))}
				</div>
			) : null}

		</>

	);
}

export default Accordian;
