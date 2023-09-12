import { Button, Popover } from '@cogoport/components';
import { IcMOverflowDot as ViewMoreActionIcon } from '@cogoport/icons-react';
import { useState } from 'react';

import FREIGHT_DETAILS_MAPPING from '../../../utlis/freight-details-mapping';
import SERVICE_TYPES_MAPPING from '../../../utlis/service-types-mapping';

import PopOverContent from './PopContent';
import styles from './style.module.css';

function TermCard({
	listItem,
	showMoreTnC,
	onClickUpdateTerms,
	onClickShowMoreTnC,
	refetch,
	description,
}) {
	const LABEL_MAPPING = {
		fcl_freight : 'Shipping Line',
		air_freight : 'Airline',
	};
	const { id = '', service = '', status = '' } = listItem;
	const [visible, setVisible] = useState(false);

	return (
		<div>
			<div className={styles.container}>
				<div className={styles.freight_item_header} onClick={onClickShowMoreTnC}>
					<div
						className={styles.freight_stroke}
						style={{ backgroundColor: SERVICE_TYPES_MAPPING?.[service]?.color }}
					/>

					<div className={styles.row} style={{ width: '100%' }}>
						{Object.values(FREIGHT_DETAILS_MAPPING).map((freightItem) => {
							const { key, label, value, span } = freightItem;
							const valueItem = value(listItem);
							let labelName = label;
							if (
								key === 'line_name'
							&& ['air_freight', 'fcl_freight'].includes(service)
							) {
								labelName = LABEL_MAPPING[service];
							}

							return (
								<div key={key} className={styles.column}>
									{labelName ? (
										<span className={styles.label}>
											{labelName}
											:
										</span>
									) : null}

									<p className={styles.value}>{valueItem || '___'}</p>
								</div>
							);
						})}

					</div>

				</div>
				<div className={styles.freight_item_header_right}>
					<ViewMoreActionIcon
						style={{ cursor: 'pointer' }}
						onClick={() => setVisible(!visible)}
					/>
					<Popover placement="left" onClickOutside={() => setVisible(false)} caret={false} render={<PopOverContent setVisible={setVisible} onClickUpdateTerms={onClickUpdateTerms} />} visible={visible} />

				</div>
			</div>
			<div className={styles.freight_item_main}>

				{showMoreTnC && description.map((descrip, index) => (
					<div key={index + 1} className={styles.applied_terms}>
						<div className={styles.index}>
							{index + 1}
							.
						</div>

						{descrip}

					</div>
				))}
			</div>
		</div>
	);
}
export default TermCard;
