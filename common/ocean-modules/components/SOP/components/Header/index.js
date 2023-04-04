import { Button } from '@cogoport/components';

import { header_container, label, value, last_update_details } from './styles.module.css';

function Header({
	setShowHistory = () => {},
	showHistory = false,
	auditsData = {},
}) {
	const formatDate = (val) => {
		const findIndex = (val || '').indexOf('T');
		return val.substring(0, findIndex);
	};

	const { list = [] } = auditsData;
	const latestUpdate = list?.[0] || {};
	return (
		<div className={header_container}>
			<div className={last_update_details}>
				<div>
					<span className={label}>Last Updated At:</span>
					<span className={value}>{formatDate(latestUpdate?.updated_at || '')}</span>
				</div>
				<div>
					<span className={label}>Last Updated By:</span>
					<span className={value}>{latestUpdate?.performed_by_user?.name}</span>
				</div>
			</div>

			<Button themeType="linkUi" onClick={() => setShowHistory(!showHistory)}>
				{showHistory ? 'Exit' : 'View History'}
			</Button>
		</div>
	);
}

export default Header;
