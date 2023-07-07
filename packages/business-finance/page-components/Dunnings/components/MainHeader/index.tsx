import { useRouter } from '@cogoport/next';

import styles from './styles.module.css';

interface Props {
	activeTab?:string,
	setActiveTab?:Function,
}

function MainHeader({ activeTab, setActiveTab }:Props) {
	const { push } = useRouter();

	const handleTabChange = (tab:string) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
			push(
				'/business-finance/dunnings/[active_tab]',
				`/business-finance/dunnings/${tab}`,
			);
		}
	};

	const cardsData = [
		{
			id      : 'dashboard',
			content : <h3 className={styles.heading_text}>Dashboard</h3>,
		},
		{
			id      : 'campaign-management',
			content : <h3 className={styles.heading_text}>Campaign Management</h3>,
		},
		{
			id      : 'exceptions-management',
			content : <h3 className={styles.heading_text}>Exceptions Management</h3>,
		},
	];

	return (
		<div className={styles.container}>
			{
				cardsData.map(({ id, content }) => (
					<button
						key={id}
						className={activeTab === id ? styles.active_card : styles.card}
						onClick={() => handleTabChange(id)}
					>
						{content}
					</button>
				))
			}
		</div>
	);
}

export default MainHeader;
