import Tabs from './Tabs';
import Conversations from './Conversations';
import Customers from './Customers';
import styles from './styles.module.css';

const index = () => {
  return (
	  <div>
	<div className={styles.header}>Cogo One</div>
	<div className={styles.layout_container}>
		<Tabs></Tabs>
		<Customers></Customers>
		<Conversations></Conversations>
	</div>
	</div>
  )
}

export default index

