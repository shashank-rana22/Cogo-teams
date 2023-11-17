import { TabPanel, Tabs, Button } from "@cogoport/components";
 import { useForm } from "@cogoport/forms";
 import { useState, useEffect } from "react";

 import Layout from "../../../common/Layout";

 import BudgetAllocate from "./components/BudgetAllocate";
 import CreateAllocationCard from "./components/CreateAllocationCard";
 import ViewModal from "./components/ViewModal";
 import RoleControls from "./controls/budget-allocation-role";
 import useListPromoBudgetAllocation from "./hooks/useListPromoBudgetAllocations";
 import styles from "./styles.module.css";

 const TABS = [
   { name: "active_budget", title: "Active", key: "active_budget" },
   { name: "inactive_budget", title: "Deactivated", key: "inactive_budget" },
 ];

 function BudgetAllocationTab() {
   const [showAllocationCard, setShowAllocationCard] = useState(false);
   const [showViewModal, setShowViewModal] = useState(false);
   const [selectedDetails, setSelectedDetails] = useState({});

   const {
     control: roleControl,
     watch: roleWatch,
     setValue: roleSetValue,
     errors: roleErrors,
   } = useForm();

   const {
     loading,
     promoBudgetList,
     paginationData,
     refetch,
     filters,
     setFilters,
   } = useListPromoBudgetAllocation();

   const budgetAllocateProps = {
     setSelectedDetails,
     setShowViewModal,
     promoBudgetList,
     paginationData,
     filters,
     setFilters,
     loading,
     refetch,
   };

   useEffect(() => {
     roleSetValue("role", "");
     setFilters((state) => ({ ...state, role: "" }));
   }, [filters.activeTab, roleSetValue, setFilters]);

   useEffect(() => {
     const subscription = roleWatch((val) => {
       setFilters((state) => ({ ...state, role: val.role }));
     });
     return () => subscription.unsubscribe();
   }, [roleWatch, setFilters]);

   return (
     <div>
       <CreateAllocationCard
         showAllocationCard={showAllocationCard}
         setShowAllocationCard={setShowAllocationCard}
         refetch={refetch}
       />

       <div className={styles.tab_container}>
         <div className={styles.tab_options}>
           {!showAllocationCard ? (
             <div className={styles.allocate_button}>
               <Button onClick={() => setShowAllocationCard((state) => !state)}>
                 ALLOCATE
               </Button>
             </div>
           ) : null}
           <div className={styles.select_wrapper}>
             <Layout
               controls={RoleControls}
               control={roleControl}
               errors={roleErrors}
             />
           </div>
         </div>
         <Tabs
           activeTab={filters.activeTab}
           onChange={(val) =>
             setFilters((state) => ({ ...state, activeTab: val, page: 1 }))
           }
           themeType="tertiary"
         >
           {TABS.map((item) => (
             <TabPanel key={item.key} name={item.name} title={item.title}>
               <BudgetAllocate {...budgetAllocateProps} />
             </TabPanel>
           ))}
         </Tabs>
       </div>

       {showViewModal ? (
         <ViewModal
           showViewModal={showViewModal}
           setShowViewModal={setShowViewModal}
           selectedDetails={selectedDetails}
           refetchListBudgetAllocation={refetch}
         />
       ) : null}
     </div>
   );
 }

 export default BudgetAllocationTab;