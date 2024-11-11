import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { useNavigate } from "react-router-dom";
import React from "react";
import { supabase } from "../../supabase";

export const Yotei = (info) => {
  //認証情報とuserIdの取得
  const auth = info["auth"];
  const userId = info["userId"];
  const userName = info["userName"];
  const nav = useNavigate();

  const handleEventSecrect = (date) => {
    nav(`/dieter/Set/${date}`, {
      state: { id: userId, date: date, userName: userName },
    });
    // console.log(date);
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
          dateClick={(e) => handleEventSecrect(e.dateStr)}
          // className="calender"
        />
      ) : (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={[jaLocale]} // 追加
          locale="ja"
          selectable={true}
          // className="calender"
        />
      )}
    </div>
  );
};
