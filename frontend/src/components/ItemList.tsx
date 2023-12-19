import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Item from "./Item";
import NotFound from "./NotFound";
import { vegetables } from "@/types/typeGroup";
import Loading from "./Loading";
import { getItems } from "@/services/utility";

import { socket } from "./../services/socket";

function ItemList() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<vegetables[]>([]);
  // socket
  const [isConnected, setIsConnected] = useState(socket.connected);
  function onConnect() {
    setIsConnected(true);
  }
  function onDisconnect() {
    setIsConnected(false);
  }

  useEffect(() => {
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);
  useEffect(() => {
    socket.on("get-new-data", getItemsInCom);
  }, [socket]);
  //socket
  const getItemsInCom = async () => {
    const res = await getItems(`/vegetables`);
    setData(res);
  };
  useEffect(() => {
    setIsLoading(true);
    getItemsInCom();
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (!data || data.length === 0) {
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
