import { describe, expect, test } from "vitest";
import { detectSource } from "./leadSource";

const SITE = "https://belkaclean74.ru/";
const at = (q = "") => new URL(SITE + q);

describe("detectSource", () => {
  test("реклама Яндекса по yclid, с названием кампании из utm", () => {
    expect(detectSource(at("?yclid=123&utm_campaign=divany"), "")).toBe("реклама Яндекса (divany)");
  });

  test("Карты Яндекса отличает от поиска Яндекса", () => {
    expect(detectSource(at(), "https://yandex.ru/maps/org/86744171945/")).toBe("Яндекс Карты");
    expect(detectSource(at(), "https://yandex.ru/")).toBe("поиск Яндекса");
  });

  test("соцсети и Авито узнаёт по referrer", () => {
    expect(detectSource(at(), "https://vk.com/belkaclean74")).toBe("ВКонтакте");
    expect(detectSource(at(), "https://www.avito.ru/chelyabinsk")).toBe("Авито");
  });

  test("переходы внутри сайта и пустой referrer — напрямую", () => {
    expect(detectSource(at(), "")).toMatch(/^напрямую/);
    expect(detectSource(at(), SITE + "uslugi/moyka-okon")).toMatch(/^напрямую/);
  });

  test("незнакомый сайт подписывает доменом", () => {
    expect(detectSource(at(), "https://example.org/page")).toBe("сайт example.org");
  });
});
