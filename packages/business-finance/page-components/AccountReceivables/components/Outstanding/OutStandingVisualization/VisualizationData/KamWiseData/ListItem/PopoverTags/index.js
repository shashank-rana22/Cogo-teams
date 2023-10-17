import { Pill, cl, Popover } from '@cogoport/components';
import { IcMLcl } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import PopoverContent from '../../../../../OverAllOutstanding/OutstandingList/PopoverContent/index';

import styles from './styles.module.css';

function PopoverTags({ data = {}, loading = false, item = {}, handleClick = () => {} }) {
	const { credit_controller_id = '', credit_controller_name = '', tagged_state = '' } = item || {};
	return (
		<div className={styles.details}>
			<div className={styles.details}>
				{(credit_controller_name || tagged_state) && (
					<div>
						{tagged_state ? (
							<div className={styles.tag_text}>{startCase(tagged_state)}</div>
						) : (
							<Pill
								key={item.label}
								size="md"
								color="blue"
							>
								<div style={{ display: 'flex' }}>
									<Popover
										theme="light"
										content={(
											<PopoverContent
												data={data}
												loading={loading}
											/>
										)}
										placement="left"
										animation="scale"
										interactive
									>
										<div className={styles.icon_wrapper}>
											<IcMLcl onClick={() => handleClick(credit_controller_id)} />
										</div>
									</Popover>
									<div className={cl`${styles.tag_text} ${styles.pill_style}`}>CC:</div>
									<div className={styles.tag_text}>
										{credit_controller_name}
									</div>
								</div>
							</Pill>
						)}
					</div>
				)}
			</div>
			<Pill
				key={item.label}
				size="md"
				color="blue"
			>
				<div style={{ display: 'flex' }}>
					<div className={cl`${styles.tag_text} ${styles.pill_style}`}>PAN:</div>
					<div className={styles.tag_text}>
						{item.registration_number}
					</div>
				</div>
			</Pill>
		</div>
	);
}

export default PopoverTags;
