import { Button } from '@cogoport/components';

function Header({ setShowHistory = () => {}, showHistory = false }) {
	return (
		<div>
			<div>
				<div>
					<div>Last Updated At:</div>
					<div>2023-03-15</div>
				</div>
				<div>
					<div>Last Updated By:</div>
					<div>Rajat Uba</div>
				</div>
			</div>

			<div>
				<Button themeType="linkUi" onClick={() => setShowHistory(!showHistory)}>
					{showHistory ? 'Exit' : 'View History'}
				</Button>
			</div>
		</div>
	);
}

export default Header;
