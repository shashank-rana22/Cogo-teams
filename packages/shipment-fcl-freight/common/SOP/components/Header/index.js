import { Button } from '@cogoport/components';

import { header_container, label, value, last_update_details } from './styles.module.css';

function Header({ setShowHistory = () => {}, showHistory = false }) {
	return (
		<div className={header_container}>
			<div className={last_update_details}>
				<div>
					<span className={label}>Last Updated At:</span>
					<span className={value}>2023-03-15</span>
				</div>
				<div>
					<span className={label}>Last Updated By:</span>
					<span className={value}>Testing</span>
				</div>
			</div>

			<Button themeType="linkUi" onClick={() => setShowHistory(!showHistory)}>
				{showHistory ? 'Exit' : 'View History'}
			</Button>
		</div>
	);
}

export default Header;
