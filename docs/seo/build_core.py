"""Семантическое ядро BelkaClean из выгрузки Вордстата (регион Челябинск).

Вход: wordstat_raw_2026-10-20.json (семя -> строки таблицы «запросы со словами»).
Выход: semantic_core.csv и сводка кластеров в stdout.
"""
import csv
import json
import re
from pathlib import Path

HERE = Path(__file__).parent
RAW = HERE / "wordstat_raw_2026-10-20.json"

# Нецелевое: товары, работа, нормативы для медучреждений, инструкции, чужие города
STOP = re.compile(
    r"пылесос|робот|парогенератор|пароочист|керхер|швабр|средств|химия для|купить|магазин|оборудован"
    r"|ваканс|работа|менеджер|договор|журнал|график|санпин|гигтест|процедурн|кабинет|палат|операцион"
    r"|как |чем |своими|домашних условиях|делать уборку|провести|проведение|проводится|текущая"
    r"|коврове|москв|спб|петербург|екатеринбург|вьетнам|заброшен|многоквартирн|ооо |авито|фото|телефон|адрес"
    r"|клоп|таракан|телескоп|скребок|стеклоочист|духовка с|щетк|щётк|детей|секс|эрот|голая|голый|салфетк|медицинск|периодичност|допускается|муравь|диана|аква клининг|эксперт клининг|клининг про|сервис\b|промышлен|отзыв"
)

# Порядок важен: первый совпавший кластер забирает фразу
CLUSTERS = [
    ("kovry", "Химчистка ковров (новая страница)", r"ковр|палас|ковролин"),
    ("himchistka", "/himchistka-mebeli", r"химчистк|диван|матрас|кресл|мягк.* мебел"),
    ("posle-remonta", "/uborka-posle-remonta", r"после ремонт|после строит"),
    ("okna", "/moyka-okon", r"окон|окна|окно|балкон|лоджи|остеклен"),
    ("fasady", "/moyka-fasadov", r"фасад|витрин|вывеск"),
    ("ofisy", "/uborka-ofisov", r"офис|помещени|коммерч"),
    ("tehnika", "/bytovaya-tehnika", r"духовк|холодильн|микроволн|свч"),
    ("kuhnya", "/kuhonnyy-garnitur", r"кухн|гарнитур"),
    ("podderzh", "/podderzhivayushchaya-uborka", r"поддерживающ|регулярн|еженедел"),
    ("dezinf", "Дезинфекция (услуги нет — не продвигаем)", r"дезинфекц|озонир"),
    ("generalnaya", "/generalnaya-uborka", r"генеральн|уборк. (квартир|дом|в квартир|коттедж)|уборка$|уборка челябинск"),
    ("glavnaya", "/ (главная)", r"клининг|уборк|убор"),
]


def load_phrases() -> dict[str, int]:
    data = json.loads(RAW.read_text(encoding="utf-8"))
    if isinstance(data, str):
        data = json.loads(data)
    phrases = {}
    for seed in data.values():
        for table_idx, phrase, count in seed["rows"]:
            if table_idx != 0:  # таблица 1 — «похожие запросы», в ядро не берём
                continue
            phrases[phrase] = max(phrases.get(phrase, 0), count)
    return phrases


def classify(phrase: str) -> tuple[str | None, str | None]:
    for key, page, pattern in CLUSTERS:
        if re.search(pattern, phrase):
            return key, page
    return None, None


def intent(phrase: str) -> str:
    if re.search(r"цен|стоим|сколько стоит|недорог|прайс", phrase):
        return "цена"
    if re.search(r"заказ|вызвать|услуг|компани", phrase):
        return "заказ"
    return "общий"


def main() -> None:
    rows = []
    for phrase, count in load_phrases().items():
        if count < 5 or STOP.search(phrase + " "):
            continue
        key, page = classify(phrase)
        if not key:
            continue
        rows.append({"cluster": key, "page": page, "phrase": phrase, "freq": count, "intent": intent(phrase)})

    rows.sort(key=lambda r: (r["cluster"], -r["freq"]))
    with open(HERE / "semantic_core.csv", "w", encoding="utf-8-sig", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["cluster", "page", "phrase", "freq", "intent"], delimiter=";")
        writer.writeheader()
        writer.writerows(rows)

    by = {}
    for r in rows:
        by.setdefault((r["cluster"], r["page"]), []).append(r)
    for (key, page), items in sorted(by.items(), key=lambda x: -sum(i["freq"] for i in x[1])):
        total = sum(i["freq"] for i in items)
        top = ", ".join(f"{i['phrase']} ({i['freq']})" for i in items[:8])
        print(f"{key}|{page}|{len(items)}|{total}|{top}")
    print("TOTAL", len(rows))


if __name__ == "__main__":
    main()
