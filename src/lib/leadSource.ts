// Откуда пришёл клиент — подписываем в заявке, которая уходит Ане в Telegram.
// Запоминаем при первом заходе: после перехода по страницам referrer и utm уже не те.
const KEY = "belka-lead-source";

const REFERRERS: Array<[RegExp, string]> = [
  [/yandex\.[a-z]+\/maps|maps\.yandex/, "Яндекс Карты"],
  [/yandex\.|ya\.ru/, "поиск Яндекса"],
  [/google\./, "поиск Google"],
  [/vk\.(com|ru)/, "ВКонтакте"],
  [/ok\.ru/, "Одноклассники"],
  [/t\.me|telegram/, "Telegram"],
  [/avito\./, "Авито"],
  [/2gis\./, "2ГИС"],
];

export function detectSource(url: URL, referrer: string): string {
  const p = url.searchParams;
  const campaign = p.get("utm_campaign");
  const withCampaign = (s: string) => (campaign ? `${s} (${campaign})` : s);
  if (p.has("yclid") || (p.get("utm_source") === "yandex" && p.get("utm_medium") === "cpc")) return withCampaign("реклама Яндекса");
  if (p.has("gclid")) return withCampaign("реклама Google");
  if (p.get("utm_source")) return withCampaign(p.get("utm_source") as string);
  let host = "";
  try { host = referrer ? new URL(referrer).href : ""; } catch { /* битый referrer */ }
  if (host && !host.includes(url.hostname)) {
    const hit = REFERRERS.find(([re]) => re.test(host));
    return hit ? hit[1] : `сайт ${new URL(host).hostname}`;
  }
  return "напрямую (закладка, QR, ссылка из сообщения)";
}

export function rememberSource(): void {
  try {
    if (!sessionStorage.getItem(KEY)) sessionStorage.setItem(KEY, detectSource(new URL(location.href), document.referrer));
  } catch { /* приватный режим — определим при отправке */ }
}

export function getSource(): string {
  try {
    return sessionStorage.getItem(KEY) || detectSource(new URL(location.href), document.referrer);
  } catch {
    return detectSource(new URL(location.href), document.referrer);
  }
}
