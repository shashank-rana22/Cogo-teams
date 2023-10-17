import { Popover, Tooltip, cl } from '@cogoport/components';
import { useState } from 'react';

import getValue from '../../../../../../utils/getValue';

import styles from './styles.module.css';

const SUFFIX = { rates_count: 'Rates AVAILABLE' };

const ONE_VALUE = 1;

function PopoverItem({ userData = {} }) {
	const redirectTo = (href) => {
		if (typeof window !== 'undefined') {
			window.open(href);
		}
	};

	return (
		<div className={styles.card} role="presentation" onClick={(e) => e.stopPropagation()}>
			<div className={styles.option_label} style={{ width: '33%' }}>{userData?.name}</div>
			<div
				className={cl`${styles.option_label} ${styles.clickable}`}
				role="presentation"
				style={{ width: '30%' }}
				onClick={(e) => {
					e.stopPropagation();
					redirectTo(
						`tel:${
							userData?.mobile_number || userData?.mobile_number_eformat
						}`,
					);
				}}
			>
				{userData?.mobile_country_code
					? `${userData?.mobile_country_code} ${userData?.mobile_number}`
					: userData?.mobile_number_eformat}
			</div>
			<div
				className={cl`${styles.option_label} ${styles.clickable}`}
				role="presentation"
				style={{ width: '37%', marginLeft: 10 }}
				onClick={(e) => {
					e.stopPropagation();
					redirectTo(`mailto:${userData?.email}`);
				}}
			>
				{userData?.email}
			</div>
		</div>
	);
}

function PopoverContent({ popoverData = {} }) {
	if (Array.isArray(popoverData)) {
		return popoverData.map((userData) => <PopoverItem key={userData?.id} userData={userData} />);
	}

	return <PopoverItem userData={popoverData} />;
}

function FieldPair({ item = {}, field = {} }) {
	const [show, setShow] = useState(false);
	const { popoverKey, withPopover } = field?.lowerKey || {};

	const handleClick = (e) => {
		e.stopPropagation();
		setShow(true);
	};

	const renderLowerText = withPopover ? (
		<Popover
			visible={show}
			placement="bottom"
			trigger="click"
			onClickOutside={() => setShow(false)}
			render={<PopoverContent popoverData={item[popoverKey]} />}
		>
			<div role="presentation" onClick={handleClick} className={styles.lower_text}>
				{getValue(item, field?.lowerKey)}
				{' '}
				{SUFFIX[field?.lowerKey?.key]}
				{Array.isArray(item[popoverKey]) && item[popoverKey].length > ONE_VALUE
					? `+ ${item[popoverKey].length - ONE_VALUE}`
					: ''}
			</div>
		</Popover>
	) : (
		<span>
			{getValue(item, field?.lowerKey)}
			{' '}
			{SUFFIX[field?.lowerKey?.key]}
		</span>
	);
	return (
		<div className={styles.container}>
			<strong>
				<Tooltip
					content={(
						<div className={styles.container}>
							<strong>{getValue(item, field?.topKey)}</strong>
						</div>
					)}
					placement="top"
				>
					<div className={styles.upper_name}>{getValue(item, field?.topKey)}</div>
				</Tooltip>
			</strong>
			{field?.lowerKey ? renderLowerText : null}
		</div>
	);
}
export default FieldPair;
