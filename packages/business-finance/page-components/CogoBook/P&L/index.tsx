import { useRouter } from '@cogoport/next';
import React, { useEffect, useState } from 'react';

import ProfitAndLossStatement from './ProfitAndLossStatement';
import SourceFile from './SourceFile';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'source_file',
		label : 'Source File',
	},
	{
		key   : 'P&L_statement',
		label : 'P&L Statement',
	},
];

const tabsKeyComponentMapping = {
	source_file     : SourceFile,
	'P&L_statement' : ProfitAndLossStatement,
};

function ProfitAndLoss() {
	const { push } = useRouter();

	const [subActiveTab, setSubActiveTab] = useState<string>('source_file');
	const tabComponentProps = {
		source_file     : {},
		'P&L_statement' : {},
	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const handleChange = (view:string) => {
		setSubActiveTab(view);
	};
	useEffect(() => {
		push(
			'/business-finance/cogo-book/[active_tab]/[view]',
			`/business-finance/cogo-book/pl_statement/${subActiveTab}`,
		);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subActiveTab]);

	return (

		<div>

			<div className={styles.container}>

				<div className={styles.flex}>

					{tabs.map((tab) => (
						<div
							key={tab.key}
							onClick={() => {
								handleChange(tab.key);
							}}
							role="presentation"
						>
							{' '}

							<div className={tab.key === subActiveTab
								? styles.sub_container_click : styles.sub_container}
							>
								{tab.label }

							</div>

						</div>
					))}
				</div>

			</div>

			{ActiveTabComponent && <ActiveTabComponent key={subActiveTab} {...tabComponentProps[subActiveTab]} />}
		</div>

	);
}
export default ProfitAndLoss;
