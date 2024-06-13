import FullCalendar, { EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

export const Yotei = (info) => {
  //認証情報とuserIdの取得
  const auth = info["auth"];
  const userId = info["userId"];
  // console.log(info);
  const nav = useNavigate();

  const handleEventSerect = (date) => {
    nav(`/dieter/Set/${date}`, { state: { id: userId } });
    console.log(date);
  };

  return (
    <div>
      {auth ? (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={[jaLocale]} // 追加
          locale="ja"
          selectable={true}
          dateClick={(e) => handleEventSerect(e.dateStr)}
        />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={[jaLocale]} // 追加
          locale="ja"
          selectable={true}
        />
      )}
    </div>
  );
};

export default Yotei;
