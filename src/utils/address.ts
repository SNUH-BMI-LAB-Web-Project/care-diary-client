export type AddressParts = {
  sido: string;
  sigungu: string;
  detail: string;
};

export const ADDRESS_DELIM = " // " as const;

export function composeAddress(parts: AddressParts): string {
  const sido = (parts.sido ?? "").trim();
  const sigungu = (parts.sigungu ?? "").trim();
  const detail = (parts.detail ?? "").trim().replace(/\s+/g, " ");

  return [sido, sigungu, detail].filter(Boolean).join(ADDRESS_DELIM);
}

export function parseAddress(value: string): AddressParts {
  const raw = (value ?? "").trim();
  if (!raw) return { sido: "", sigungu: "", detail: "" };

  const [sido = "", sigungu = "", ...rest] = raw.split(ADDRESS_DELIM);
  return {
    sido: sido.trim(),
    sigungu: sigungu.trim(),
    detail: rest.join(ADDRESS_DELIM).trim(),
  };
}

export function pickSidoSigunguFromRoadAddress(road: string): {
  sido: string;
  sigungu: string;
} {
  const tokens = (road ?? "").trim().split(/\s+/).filter(Boolean);

  const sido = tokens[0] ?? "";
  const sigungu = tokens[1] ?? "";

  return { sido, sigungu };
}

export function buildDetail(roadAddress: string, extraDetail: string) {
  const road = (roadAddress ?? "").trim();
  const extra = (extraDetail ?? "").trim();

  if (!road && !extra) return "";
  if (road && !extra) return road;
  if (!road && extra) return extra;

  return `${road} ${extra}`.replace(/\s+/g, " ");
}

export function stripLeadingAdminFromRoadAddress(
  roadAddress: string,
  sido: string,
  sigungu: string,
) {
  const road = (roadAddress ?? "").trim();
  const s = (sido ?? "").trim();
  const g = (sigungu ?? "").trim();

  if (!road) return "";

  const norm = (v: string) => v.replace(/\s+/g, " ").trim();
  const R = norm(road);
  const S = norm(s);
  const G = norm(g);

  const prefix = `${S} ${G} `;
  if (S && G && R.startsWith(prefix)) {
    return R.slice(prefix.length).trim();
  }

  return R;
}
