import { Request, Response } from "express";

import { vegetables } from "../db/schema/vegetables.schema";

export const routTest = (req: Request, res: Response) => {
  res.send("Welcome to test route!");
  res.end();
};
export const getVegList = async (req: Request, res: Response) => {
  try {
    const vegetablesData = await vegetables.find();

    res.json(vegetablesData);
  } catch (err) {
    console.log(err);
  }
  res.end();
};

export const addVegItem = async (req: Request, res: Response) => {
  const data = {
    ...req.body,
    createdAt: new Date().toString(),
  };
  const socket = req.app.get("socket");
  try {
    const vegetablesData = await vegetables.create(data);

    socket.emit("get-new-data", "real time update");
    socket.broadcast.emit("get-new-data", "real time update");

    res.json(vegetablesData);
  } catch (err) {
    console.log(err);
  }

  res.end();
};

export const updateVegItem = async (req: Request, res: Response) => {
  const socket = req.app.get("socket");
  const update = {
    ...req.body,
    updatedAt: new Date().toString(),
  };
  const filter = { _id: req.params.id };
  try {
    const vegetablesData = await vegetables.findOneAndUpdate(filter, update, {
      returnOriginal: false,
    });
    socket.emit("get-new-data", "real time update");
    socket.broadcast.emit("get-new-data", "real time update");
    res.json(vegetablesData);
  } catch (err) {
    console.log(err);
  }

  res.end();
};

export const deleteVegItem = async (req: Request, res: Response) => {
  const socket = req.app.get("socket");
  const filter = { _id: req.params.id };

  try {
    const vegetablesData = await vegetables.deleteOne(filter);
    socket.emit("get-new-data", "real time update");
    socket.broadcast.emit("get-new-data", "real time update");

    res.json(vegetablesData);
  } catch (err) {
    console.log(err);
  }

  res.end();
};

export const getByIdVegItem = async (req: Request, res: Response) => {
  try {
    const vegetablesData = await vegetables.findById(req.params.id);

    res.json(vegetablesData);
  } catch (err) {
    console.log(err);
  }

  res.end();
};
