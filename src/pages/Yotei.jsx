import FullCalendar, { EventInput } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import jaLocale from "@fullcalendar/core/locales/ja";
import { Link, useNavigate } from "react-router-dom";

export const Yotei = () => {
  const nav = useNavigate();

  const handleEventSerect = (e) => {
    const date = e;
    nav(`/dieter/Set/${date}`);
    // console.log(e);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locales={[jaLocale]} // 追加
        locale="ja"
        selectable={true}
        dateClick={(e) => handleEventSerect(e.dateStr)}
      />
    </div>
  );
};

export default Yotei;
