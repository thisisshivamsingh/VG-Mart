import React from "react";
import { Row } from "react-bootstrap";
import Item from "./Item";

import NotFound from "./NotFound";
import { vegetables } from "@/types/typeGroup";
import Loading from "./Loading";
import { getItems } from "@/services/utility";
import useSWR from "swr";

function ItemList() {
  const { data, error, isLoading } = useSWR<vegetables[]>(
    `/vegetables`,
    getItems
  );

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0 || error) {
    return <NotFound Message="Items Not Found" />;
  }

  return (
    <Row>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <Item item={item} />
          </React.Fragment>
        );
      })}
    </Row>
  );
}

export default ItemList;
