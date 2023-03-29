import { Popover } from '@cogoport/components';
import { IcMLcl } from '@cogoport/icons-react';
import React from 'react';

import PopoverContent from '../PopoverContent';

import styles from './styles.module.css';

interface CreditController {
	id?: string,
	name?: string,
	email?: string
}

interface SalesAgent {
	id?: string,
	name?: string,
	email?: string
}
interface ItemProps {
	creditController?: CreditController,
	salesAgent?: SalesAgent,
	businessName?: string,
	collectionPartyType?: string[],
	serialId?: string,
	countryCode?: string,
	organizationSerialId?: string,
	updatedAt?: Date,
	selfOrganizationName?: string,
	organizationId?: string,
	selfOrganizationId?: string
}

interface PopoverProps {
	data?: object,
	loading?: boolean,
	handleClick?: (p: string) => void,
	item?: ItemProps
}

function PopoverTags({
	data,
	loading,
	handleClick,
	item,

}: PopoverProps) {
	const {
		creditController,
		salesAgent,
	} = item || {};
	const content = (
		<PopoverContent data={data} loading={loading} />
	);

	return (
		<div className={styles.details}>

			<div className={styles.main_div}>
				<Popover
					placement="left"
					render={content}
					className={styles.filters_popover}
				>
					<div className={styles.icon_wrapper}>
						<IcMLcl
							onClick={() => handleClick(salesAgent?.id)}
						/>
					</div>
				</Popover>

				<div className={styles.flex}>
					<div className={styles.tag_texts}>
						KAM Owner :
						<div className={styles.tag_text}>
							{salesAgent?.name || '-'}
						</div>
					</div>
					<div className={styles.tag_text}>{salesAgent?.email || '-'}</div>
				</div>
			</div>

			<div className={styles.main_div}>
				<Popover
					placement="left"
					render={content}
					className={styles.filters_popover}
				>
					<div className={styles.icon_wrapper}>
						<IcMLcl
							onClick={() => handleClick(salesAgent?.id)}
						/>
					</div>
				</Popover>

				<div className={styles.flex}>
					<div className={styles.tag_texts}>
						AGENT :
						<div className={styles.tag_text}>
							{salesAgent?.name || '-'}
						</div>
					</div>
					<div className={styles.tag_text}>{salesAgent?.email || '-'}</div>
				</div>
			</div>

			<div className={styles.main_div}>
				<Popover
					render={content}
					placement="left"
				>
					<div className={styles.icon_wrapper}>
						<IcMLcl
							onClick={() => handleClick(creditController?.id)}
						/>
					</div>
				</Popover>
				<div className={styles.flex}>
					<div className={styles.tag_texts}>
						CC :
						<div className={styles.tag_text}>
							{creditController?.name || '-'}
						</div>
					</div>

					<div className={styles.tag_text}>
						{creditController?.email || '-'}
					</div>
				</div>
			</div>

		</div>
	);
}

export default PopoverTags;
