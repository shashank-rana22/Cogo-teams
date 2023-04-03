import { Popover } from '@cogoport/components';
import { IcMLcl } from '@cogoport/icons-react';
import React from 'react';

import PopoverContent from '../PopoverContent';

import styles from './styles.module.css';

interface AgentProps {
	id?: string,
	name?: string,
	email?: string
}

interface ItemProps {
	creditController?: AgentProps,
	salesAgent?: AgentProps,
	businessName?: string,
	collectionPartyType?: string[],
	serialId?: string,
	countryCode?: string,
	organizationSerialId?: string,
	updatedAt?: Date,
	selfOrganizationName?: string,
	organizationId?: string,
	selfOrganizationId?: string
	kam?: AgentProps,
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
		kam = {},
		creditController = {},
		salesAgent = {},
	} = item || {};

	const { id = '', name = '', email = '' } = kam;
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
							onClick={() => handleClick(id)}
						/>
					</div>
				</Popover>

				<div className={styles.flex}>
					<div className={styles.tag_texts}>
						KAM Owner :
						<div className={styles.tag_text}>
							{name || '-'}
						</div>
					</div>
					<div className={styles.tag_text}>{email || '-'}</div>
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
					className={styles.filters_popover}
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
