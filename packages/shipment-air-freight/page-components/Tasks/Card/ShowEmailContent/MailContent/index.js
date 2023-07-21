import { Placeholder } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import MailStatus from '../MailStatus';
import TemplateModalContent from '../TemplateModalContent';

import styles from './styles.module.css';

function MailContent({
	loading = false,
	list = [],
}) {
	if (loading) {
		return <div className={styles.loading_state}><Placeholder /></div>;
	}
	return (
		<>
			{!isEmpty(list) && <MailStatus list={list} />}
			<TemplateModalContent list={list} />
		</>
	);
}

export default MailContent;
