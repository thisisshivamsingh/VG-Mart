import AddItem from "@/components/AddItem";
import AuthContext from "@/context/AuthContext";
import Layout from "@/Layout/Layout";

function AddItemPage() {
  return (
    <div>
      <AuthContext>
        <Layout>
          <AddItem />
        </Layout>
      </AuthContext>
    </div>
  );
}

export default AddItemPage;
