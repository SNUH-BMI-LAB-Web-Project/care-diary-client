export const formatKoreanDate = (date: Date) => {
  const days = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const weekday = days[date.getDay()];

  return `${year}년 ${month}월 ${day}일 ${weekday}`;
};

type DateTimeFormatMode = "date" | "datetime";

export function formatCreated(
  value?: string | Date,
  mode: DateTimeFormatMode = "datetime",
) {
  if (!value) return "-";

  if (typeof value === "string") {
    const raw = value.trim();

    const ymd = raw.length >= 10 ? raw.slice(0, 10) : "";
    const dateText = /^\d{4}-\d{2}-\d{2}$/.test(ymd)
      ? ymd.replaceAll("-", ".")
      : raw;

    if (mode === "date") return dateText;

    const sepIdx = raw.indexOf("T") >= 0 ? raw.indexOf("T") : raw.indexOf(" ");
    if (sepIdx >= 0 && raw.length >= sepIdx + 5) {
      const hhmm = raw.slice(sepIdx + 1, sepIdx + 6);
      if (/^\d{2}:\d{2}$/.test(hhmm)) return `${dateText} ${hhmm}`;
    }

    return dateText;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const y = value.getFullYear();
    const m = String(value.getMonth() + 1).padStart(2, "0");
    const d = String(value.getDate()).padStart(2, "0");
    const dateText = `${y}.${m}.${d}`;

    if (mode === "date") return dateText;

    const hh = String(value.getHours()).padStart(2, "0");
    const mm = String(value.getMinutes()).padStart(2, "0");
    return `${dateText} ${hh}:${mm}`;
  }

  return "-";
}
