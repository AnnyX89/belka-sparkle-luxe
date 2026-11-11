// Цели Яндекс Метрики (счётчик в index.html). Нужны Директу: он учится на заявках, а не на кликах.
const COUNTER_ID = 113260710;

export type Goal = "lead_form" | "click_phone" | "click_telegram";

type Ym = (id: number, method: "reachGoal", goal: Goal) => void;

export function reachGoal(goal: Goal): void {
  const ym = (window as unknown as { ym?: Ym }).ym;
  if (typeof ym === "function") ym(COUNTER_ID, "reachGoal", goal);
}

/** Клики по телефону и Telegram в любом месте сайта — одним слушателем, без правки каждой ссылки */
export function trackContactClicks(): void {
  document.addEventListener("click", e => {
    const link = (e.target as Element | null)?.closest?.("a[href]");
    const href = link?.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) reachGoal("click_phone");
    else if (href.includes("t.me/")) reachGoal("click_telegram");
  }, { capture: true });
}
