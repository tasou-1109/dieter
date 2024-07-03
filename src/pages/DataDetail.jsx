import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const DataDetail = () => {
  const data = useLocation();
  const menus = data.state.menus;
  console.log(menus);

  //   return (

  //   )
};
