import type { ConferenceDeadline } from "../types/dashboard";

const SHEET_ID = "1od0GrRgw-AiOJnGnisWBKoCdadtelXHERR3_TyrnIF8";
const SHEET_NAME = "1";

const READ_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NAME}`;
const WRITE_URL = "여기에_앱스크립트_배포_URL";

export async function fetchDeadlines(): Promise<ConferenceDeadline[]> {
  const res = await fetch(READ_URL);
  if (!res.ok) {
    throw new Error("데이터를 불러오지 못했습니다.");
  }

  const json = await res.json();

  return (json as ConferenceDeadline[]).map((item) => ({
    id: String(item.id ?? "").trim(),
    conference: String(item.conference ?? "").trim(),
    deadline: String(item.deadline ?? "").trim()
  }));
}

async function writeSheet(action: "create" | "update" | "delete", payload: unknown) {
  const res = await fetch(WRITE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body: JSON.stringify({ action, payload })
  });

  if (!res.ok) {
    throw new Error(`쓰기 요청 실패: ${res.status}`);
  }

  return res.json();
}

export async function createDeadline(input: ConferenceDeadline) {
  return writeSheet("create", input);
}

export async function updateDeadline(input: ConferenceDeadline) {
  return writeSheet("update", input);
}

export async function deleteDeadline(id: string) {
  return writeSheet("delete", { id });
}