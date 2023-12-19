import AddItem from "@/components/AddItem";
import Layout from "@/Layout/Layout";

function EditItem() {
  return (
    <div>
      {/* {JSON.stringify(itemDataById)} */}
      <Layout>
        <AddItem />
      </Layout>
    </div>
  );
}

export default EditItem;
