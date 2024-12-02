import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Yotei = (info) => {
  //認証情報とuserIdの取得
  const auth = info["auth"];
  const user_id = info["user_id"];
  const user_name = info["user_name"];
  const workOut = info["workOut"];
  //console.log(auth);
  const nav = useNavigate();

  const handleEventSecrect = (date) => {
    nav(`/dieter/Set/${date}`, {
      state: {
        id: user_id,
        date: date,
        user_name: user_name,
        workOut: workOut,
      },
    });
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
