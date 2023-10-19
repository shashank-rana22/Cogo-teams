import { Popover } from '@cogoport/components';
import { IcMLcl } from '@cogoport/icons-react';
import React from 'react';

import PopoverContent from '../PopoverContent';

import styles from './styles.module.css';

function PopoverTags({ data = {}, loading = false, handleClick = () => {}, item = {} }) {
	const { kam = {}, creditController = {}, salesAgent = {} } = item || {};

	const { id = '', name = '', email = '' } = kam;

	return (
		<div className={styles.details}>
			{name ? (
				<div className={styles.main_div}>
					<Popover
						placement="left"
						render={
							<PopoverContent data={data} loading={loading} />
						}
						className={styles.filters_popover}
					>
						<div className={styles.icon_wrapper}>
							<IcMLcl onClick={() => handleClick(id)} />
						</div>
					</Popover>

					<div className={styles.flex}>
						<div className={styles.tag_texts}>
							KAM Owner :
							<div className={styles.tag_text}>{name || '-'}</div>
						</div>
						<div className={styles.tag_text}>{email || '-'}</div>
					</div>
				</div>
			) : null}

			{salesAgent?.name ? (
				<div className={styles.main_div}>
					<Popover
						placement="left"
						render={
							<PopoverContent data={data} loading={loading} />
						}
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
						<div className={styles.tag_text}>
							{salesAgent?.email || '-'}
						</div>
					</div>
				</div>
			) : null}

			{creditController?.name ? (
				<div className={styles.main_div}>
					<Popover
						render={
							<PopoverContent data={data} loading={loading} />
						}
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
			) : null}
		</div>
	);
}

export default PopoverTags;
