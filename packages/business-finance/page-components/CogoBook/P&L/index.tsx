import { useRouter } from '@cogoport/next';
import React, { useState } from 'react';

import PLStatement from './PLStatement';
import SourceFile from './SourceFile';
import styles from './styles.module.css';

const tabs = [
	{
		key   : 'source_files',
		label : 'Source Files',
	},
	{
		key   : 'pl_statement',
		label : 'P&L Statement',
	},
];

const tabsKeyComponentMapping = {
	source_files : SourceFile,
	pl_statement : PLStatement,
};

function ProfitAndLoss() {
	const { push } = useRouter();

	const [subActiveTab, setSubActiveTab] = useState<string>('source_files');

	const tabComponentProps = {
		source_files : {},
		pl_statement : {},

	};

	const ActiveTabComponent = tabsKeyComponentMapping[subActiveTab] || null;
	const handleChange = (view:string) => {
		setSubActiveTab(view);
		push(
			'/business-finance/cogo-book/[active_tab]/[view]',
			`/business-finance/cogo-book/pl_statement/${view}`,
		);
	};

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
