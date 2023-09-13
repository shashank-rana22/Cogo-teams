import { TabPanel } from '@cogoport/components';

function StyledTabPanel({ children = null, ...rest }) {
	return (
		<TabPanel {...rest}>
			{children}
		</TabPanel>
	);
}

export default StyledTabPanel;
