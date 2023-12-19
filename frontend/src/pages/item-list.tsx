import ItemList from "@/components/ItemList";
import AuthContext from "@/context/AuthContext";
import Layout from "@/Layout/Layout";
import React from "react";

function ItemListPage() {
  return (
    <div>
      <AuthContext>
        <Layout>
          <ItemList />
        </Layout>
      </AuthContext>
    </div>
  );
}

export default ItemListPage;
