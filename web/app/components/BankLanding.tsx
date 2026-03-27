"use client";

import { Fragment, Suspense, useState } from "react";
import ContactForm from "./ContactForm";
import styles from "./BankLanding.module.css";

type Locale = "ru" | "en";
type LayerId = "specialist" | "orchestrator" | "executive";
type RoleId = "marketing" | "product" | "director" | "board";

type LocalizedString = Record<Locale, string>;

type Agent = {
    id: number;
    layer: LayerId;
    name: LocalizedString;
    desc: LocalizedString;
    value: LocalizedString;
};

type Role = {
    id: RoleId;
    label: LocalizedString;
    hint: LocalizedString;
    agents: number[];
};

type Scenario = {
    id: number;
    title: LocalizedString;
    result: LocalizedString;
    agentId: number;
    story: LocalizedString;
    outcome: LocalizedString;
};

type CompareItem = {
    text: LocalizedString;
    highlight: LocalizedString;
};

const renderCompareText = (item: CompareItem, locale: Locale) => {
    const text = item.text[locale];
    const highlight = item.highlight[locale];
    const startIndex = text.indexOf(highlight);

    if (startIndex === -1) {
        return text;
    }

    const endIndex = startIndex + highlight.length;

    return (
        <>
            {text.slice(0, startIndex)}
            <strong>{highlight}</strong>
            {text.slice(endIndex)}
        </>
    );
};

const agents: Agent[] = [
    {
        id: 1,
        layer: "specialist",
        name: { ru: "Ценовой радар", en: "Pricing radar" },
        desc: {
            ru: "Рыночный коридор ставок: min, max, median, позиция банка",
            en: "Market rate corridor: min, max, median, and the bank's position",
        },
        value: {
            ru: "Ставка ниже рынка на 1 п.п. при портфеле 100M BYN = 1M BYN/год упущенного дохода",
            en: "A rate 1 pp below market on a 100M BYN book equals 1M BYN in missed annual income",
        },
    },
    {
        id: 2,
        layer: "specialist",
        name: { ru: "Анализатор белых пятен", en: "Whitespace analyzer" },
        desc: {
            ru: "Ниши, где банк отсутствует, но конкуренты представлены",
            en: "Categories where the bank is absent while competitors already participate",
        },
        value: {
            ru: "Выход в незанятый сегмент = +5-15% к выручке направления",
            en: "Entry into an underserved segment can add 5-15% to business-line revenue",
        },
    },
    {
        id: 3,
        layer: "specialist",
        name: { ru: "Монитор изменений", en: "Change monitor" },
        desc: {
            ru: "Ежедневный diff: новые продукты, измененные ставки, скрытые предложения",
            en: "Daily diff of new products, changed rates, and hidden offers",
        },
        value: {
            ru: "Реакция за часы вместо недель - сохранение портфеля и клиентов",
            en: "React in hours instead of weeks to preserve balances and customers",
        },
    },
    {
        id: 4,
        layer: "specialist",
        name: { ru: "Матрица фич", en: "Feature matrix" },
        desc: {
            ru: "Сравнение характеристик: онлайн-заявка, cashback, документы, возраст",
            en: "Feature comparison: online application, cashback, documents, age limits",
        },
        value: {
            ru: "18 из 21 банка дают онлайн-заявку, а вы нет - видно мгновенно",
            en: "If 18 of 21 banks allow online applications and you do not, it becomes obvious immediately",
        },
    },
    {
        id: 5,
        layer: "specialist",
        name: { ru: "Аналитик витрины", en: "Showcase analyst" },
        desc: {
            ru: "Как конкуренты продвигают продукты: featured, popup, рекламные метки",
            en: "How competitors promote products: featured slots, popups, and promo labels",
        },
        value: {
            ru: "Конкурент инвестирует в popup + featured - сигнал к действию",
            en: "A competitor investing in popup plus featured placement is an actionable signal",
        },
    },
    {
        id: 6,
        layer: "specialist",
        name: { ru: "Калькулятор TCO мерчанта", en: "Merchant TCO calculator" },
        desc: {
            ru: "Полная стоимость эквайринга: комиссии + оборудование у каждого банка",
            en: "Full acquiring cost by bank: fees plus hardware",
        },
        value: {
            ru: "50 переключений мерчантов = +2-5M BYN оборота",
            en: "Fifty merchant switches can bring 2-5M BYN in additional acquiring volume",
        },
    },
    {
        id: 7,
        layer: "orchestrator",
        name: { ru: "Оркестратор", en: "Orchestrator" },
        desc: {
            ru: "Единая точка входа: классифицирует запрос и вызывает нужных специалистов",
            en: "Single point of entry that classifies a request and calls the right specialists",
        },
        value: {
            ru: "Не нужно знать архитектуру - просто задайте вопрос",
            en: "No need to understand the architecture. Ask the question and route it automatically",
        },
    },
    {
        id: 8,
        layer: "executive",
        name: { ru: "Еженедельный дайджест", en: "Weekly digest" },
        desc: {
            ru: "Автоматический обзор конкурентного ландшафта каждую неделю",
            en: "Automated overview of the competitive landscape every week",
        },
        value: {
            ru: "Экономия 8-12 часов аналитика в неделю",
            en: "Saves 8-12 analyst hours every week",
        },
    },
    {
        id: 9,
        layer: "executive",
        name: { ru: "Подготовка к комитету", en: "Committee pack builder" },
        desc: {
            ru: "Полный аналитический пакет для запуска или изменения продукта",
            en: "Full analytical pack for launching or changing a product",
        },
        value: {
            ru: "Time-to-decision: с 2-3 недель до 1-2 дней",
            en: "Cuts time to decision from 2-3 weeks to 1-2 days",
        },
    },
    {
        id: 10,
        layer: "executive",
        name: { ru: "Стратегическая карта", en: "Strategic map" },
        desc: {
            ru: "Позиция банка vs конкуренты - одна картинка по всем доменам",
            en: "The bank's position versus competitors in one view across all domains",
        },
        value: {
            ru: "Замена 50-страничному отчету - за 30 секунд",
            en: "Replaces a 50-page report with a 30-second strategic view",
        },
    },
];

const roles: Role[] = [
    {
        id: "marketing",
        label: { ru: "Маркетолог", en: "Marketing lead" },
        hint: {
            ru: "Digital-стратегия конкурентов",
            en: "Competitor digital strategy",
        },
        agents: [5, 4, 3],
    },
    {
        id: "product",
        label: { ru: "Продуктовый менеджер", en: "Product manager" },
        hint: {
            ru: "Ставки, ниши, пакет к комитету",
            en: "Rates, whitespace, committee pack",
        },
        agents: [1, 2, 4, 6, 3],
    },
    {
        id: "director",
        label: { ru: "Директор направления", en: "Business-line director" },
        hint: {
            ru: "Дайджест, сигналы, позиция",
            en: "Digest, signals, strategic position",
        },
        agents: [8, 1, 2, 3, 10],
    },
    {
        id: "board",
        label: { ru: "Правление", en: "Board" },
        hint: { ru: "Scorecard за 30 секунд", en: "30-second scorecard" },
        agents: [10, 8, 9],
    },
];

const scenarios: Scenario[] = [
    {
        id: 1,
        title: {
            ru: "Конкурент изменил ставку - вы узнали в тот же день",
            en: "A competitor changed the rate and you knew the same day",
        },
        result: {
            ru: "Сохранение портфеля",
            en: "Portfolio retention",
        },
        agentId: 3,
        story: {
            ru: 'Беларусбанк повысил ставку по вкладу с 26% до 28.5%. Агент "Монитор изменений" формирует алерт: "Ваш продукт ниже медианы на 1.8 п.п." Решение принимается в тот же день.',
            en: 'Belarusbank increased a deposit rate from 26% to 28.5%. The Change monitor issues an alert: "Your offer is 1.8 pp below the median." A response decision is made the same day.',
        },
        outcome: {
            ru: "При базе 500M BYN предотвращение оттока 2% = сохранение 10M BYN.",
            en: "On a 500M BYN book, preventing 2% churn protects 10M BYN.",
        },
    },
    {
        id: 2,
        title: {
            ru: "Нашли нишу - запустили продукт первыми",
            en: "You found a gap and launched first",
        },
        result: {
            ru: "+5-15% к выручке сегмента",
            en: "+5-15% segment revenue",
        },
        agentId: 2,
        story: {
            ru: '"Где мы отсутствуем, но есть 3+ конкурента?" Агент "Анализатор белых пятен" отвечает: "Кредит на образование - 7 банков, ставка 38-52%." Продукт запускается за 6 недель.',
            en: '"Where are we absent while 3 or more competitors are present?" The Whitespace analyzer answers: "Education loans, 7 banks active, rates 38-52%." The team launches in 6 weeks.',
        },
        outcome: {
            ru: "Первый мувер в сегменте. +8% к портфелю за год.",
            en: "First mover in the segment. An 8% portfolio lift over a year.",
        },
    },
    {
        id: 3,
        title: {
            ru: "Правление видит позицию банка за 30 секунд",
            en: "The board sees the bank's position in 30 seconds",
        },
        result: {
            ru: "Скорость стратегических решений",
            en: "Faster strategic decisions",
        },
        agentId: 10,
        story: {
            ru: 'Агент "Стратегическая карта" показывает: "Кредиты - топ-5. Эквайринг - ставки на 0.3 п.п. выше рынка. Карты рассрочки - не представлены."',
            en: 'The Strategic map shows: "Loans are top-5. Acquiring rates are 0.3 pp above market. Installment cards are missing."',
        },
        outcome: {
            ru: "Стратегические приоритеты определяются за встречу, а не за квартал.",
            en: "Strategic priorities are set in one meeting instead of over a quarter.",
        },
    },
    {
        id: 4,
        title: {
            ru: "Маркетолог перестраивает канал по данным",
            en: "Marketing reworks the channel using evidence",
        },
        result: {
            ru: "Конверсия +20-40%",
            en: "Conversion +20-40%",
        },
        agentId: 5,
        story: {
            ru: 'Агент "Аналитик витрины" показывает: "Альфа-Банк использует popup-форму, МТБанк продвигает Халву как featured. У вас ноль продуктов в блоке лучших за месяц."',
            en: 'The Showcase analyst reports: "Alfa Bank uses a popup form, MTBank pushes Halva as a featured product. You have zero products in the monthly featured block."',
        },
        outcome: {
            ru: "Popup + featured размещение дает рост заявок на 20-40%.",
            en: "Popup plus featured placement can raise applications by 20-40%.",
        },
    },
    {
        id: 5,
        title: {
            ru: "Менеджер закрывает мерчанта с расчетом на руках",
            en: "A manager closes a merchant with the math ready",
        },
        result: {
            ru: "+2-5M BYN оборота",
            en: "+2-5M BYN volume",
        },
        agentId: 6,
        story: {
            ru: 'Агент "Калькулятор TCO" считает: "У конкурента 4 245 BYN/мес, у нас 3 428 BYN/мес. Экономия: 817 BYN/мес."',
            en: 'The Merchant TCO calculator shows: "Competitor total cost is 4,245 BYN per month, ours is 3,428 BYN. Savings: 817 BYN per month."',
        },
        outcome: {
            ru: "50 переключений мерчантов дают +2-5M BYN оборота по эквайрингу.",
            en: "Fifty merchant switches add 2-5M BYN in acquiring turnover.",
        },
    },
    {
        id: 6,
        title: {
            ru: "Комитет работает с данными, а не мнениями",
            en: "The committee works from data, not opinions",
        },
        result: {
            ru: "Решение за 1 день",
            en: "Decision in 1 day",
        },
        agentId: 9,
        story: {
            ru: 'Агент "Подготовка к комитету" собирает за день рыночную карту, ставки, фичи и незанятые ниши в единый пакет для решения.',
            en: "The Committee pack builder prepares the market map, rate view, feature comparison, and whitespace analysis in one day.",
        },
        outcome: {
            ru: "Комитет принимает решение сразу. Time-to-market сокращается на 4 недели.",
            en: "The committee decides immediately. Time to market shrinks by 4 weeks.",
        },
    },
];

const layerLabels: Record<LayerId, LocalizedString> = {
    specialist: { ru: "Анализ данных", en: "Data analysis" },
    orchestrator: { ru: "Единая точка входа", en: "Single point of entry" },
    executive: { ru: "Отчеты и решения", en: "Reports and decisions" },
};

const sectionLabels = {
    change: { ru: "#Что меняется", en: "#What changes" },
    cases: { ru: "#Кейсы", en: "#Use cases" },
    roles: { ru: "#Кому это нужно", en: "#Who this is for" },
    agents: { ru: "#Агенты", en: "#Agents" },
} satisfies Record<string, LocalizedString>;

const beforeItems: CompareItem[] = [
    {
        text: {
            ru: "Аналитик мониторит конкурентов - 8-12 часов в неделю",
            en: "An analyst monitors competitors manually for 8-12 hours every week",
        },
        highlight: {
            ru: "8-12 часов в неделю",
            en: "8-12 hours every week",
        },
    },
    {
        text: {
            ru: "Подготовка конкурентного обзора - 2-3 недели",
            en: "A competitive review takes 2-3 weeks to prepare",
        },
        highlight: {
            ru: "2-3 недели",
            en: "2-3 weeks",
        },
    },
    {
        text: {
            ru: "Скорость реакции на действия конкурентов - дни и недели",
            en: "Reaction speed to competitor moves is measured in days and weeks",
        },
        highlight: {
            ru: "дни и недели",
            en: "days and weeks",
        },
    },
    {
        text: {
            ru: "Продуктовые ниши обнаруживаются с задержкой",
            en: "Product whitespace is discovered late",
        },
        highlight: {
            ru: "с задержкой",
            en: "late",
        },
    },
    {
        text: {
            ru: "Правление получает мнения вместо данных",
            en: "The board gets opinions instead of evidence",
        },
        highlight: {
            ru: "мнения",
            en: "opinions",
        },
    },
];

const afterItems: CompareItem[] = [
    {
        text: {
            ru: "Агент мониторит непрерывно - экономия 400+ часов в год",
            en: "Agents monitor continuously and save 400+ hours per year",
        },
        highlight: {
            ru: "экономия 400+ часов в год",
            en: "save 400+ hours per year",
        },
    },
    {
        text: {
            ru: "Полный пакет для комитета - за 1-2 дня",
            en: "A full committee pack arrives in 1-2 days",
        },
        highlight: {
            ru: "за 1-2 дня",
            en: "in 1-2 days",
        },
    },
    {
        text: {
            ru: "Алерт об изменении ставки - в течение 24 часов",
            en: "A rate-change alert arrives within 24 hours",
        },
        highlight: {
            ru: "в течение 24 часов",
            en: "within 24 hours",
        },
    },
    {
        text: {
            ru: "Gap-анализ в реальном времени",
            en: "Gap analysis updates in real time",
        },
        highlight: {
            ru: "в реальном времени",
            en: "in real time",
        },
    },
    {
        text: {
            ru: "Правление получает данные с рекомендациями",
            en: "The board gets data with recommendations",
        },
        highlight: {
            ru: "данные с рекомендациями",
            en: "data with recommendations",
        },
    },
];

const stats = [
    {
        value: "400",
        accent: "+",
        label: {
            ru: "Часов экономии в год",
            en: "Hours saved per year",
        },
    },
    {
        value: "24",
        accent: { ru: "ч", en: "h" },
        label: {
            ru: "Реакция на конкурентов",
            en: "Reaction time to competitor changes",
        },
    },
    {
        value: "10",
        accent: "x",
        label: {
            ru: "Быстрее к комитету",
            en: "Faster committee readiness",
        },
    },
    {
        value: "21",
        accent: "×",
        suffix: "8",
        label: {
            ru: "Банков × продуктовых доменов",
            en: "Banks × product domains",
        },
    },
];

const heroMetrics = [
    {
        value: "21",
        label: {
            ru: "банков в контуре",
            en: "banks in contour",
        },
    },
    {
        value: "8",
        label: {
            ru: "продуктовых доменов",
            en: "product domains",
        },
    },
    {
        value: "24",
        label: {
            ru: "часа до сигнала",
            en: "hours to alert",
        },
    },
    {
        value: "1-2",
        label: {
            ru: "дня до пакета на комитет",
            en: "days to a committee pack",
        },
    },
];

const heroSignals = [
    {
        tag: {
            ru: "Ценовой сдвиг",
            en: "Pricing shift",
        },
        text: {
            ru: "4 банка меняли депозитные ставки за последние 24 часа.",
            en: "4 banks moved deposit pricing in the last 24 hours.",
        },
    },
    {
        tag: {
            ru: "Белое пятно",
            en: "Whitespace",
        },
        text: {
            ru: "Карты рассрочки и education loans остаются незакрытыми нишами.",
            en: "Installment cards and education loans remain open whitespace.",
        },
    },
    {
        tag: {
            ru: "Комитет",
            en: "Committee",
        },
        text: {
            ru: "Пакет к решению собирается за 1-2 дня вместо нескольких недель.",
            en: "The decision pack is assembled in 1-2 days instead of several weeks.",
        },
    },
];

const trackedDomains: Record<Locale, string[]> = {
    ru: [
        "депозиты",
        "потребкредиты",
        "карты",
        "карты рассрочки",
        "эквайринг",
        "РКО",
        "SME",
        "зарплатные проекты",
    ],
    en: [
        "deposits",
        "consumer loans",
        "cards",
        "installment cards",
        "acquiring",
        "cash management",
        "SME",
        "payroll",
    ],
};

type Props = {
    locale: Locale;
};

export default function BankLanding({ locale }: Props) {
    const [openScenarioId, setOpenScenarioId] = useState<number | null>(null);
    const [activeRoleId, setActiveRoleId] = useState<RoleId | null>(null);

    const activeRole = roles.find((role) => role.id === activeRoleId) ?? null;
    const tickerItems = [...trackedDomains[locale], ...trackedDomains[locale]];

    return (
        <div className={styles.page}>
            <section className={`${styles.hero} ${styles.dotBg}`}>
                <div className={styles.heroMedia} aria-hidden="true">
                    <video
                        className={styles.heroVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="auto"
                    >
                        <source
                            src="/video/bank-hero-loop.mp4"
                            type="video/mp4"
                        />
                    </video>
                    <div className={styles.heroVideoGlow} />
                    <div className={styles.heroVideoShade} />
                </div>
                <div className={styles.container}>
                    <div className={styles.heroLayout}>
                        <div className={styles.heroCopy}>
                            <div
                                className={`${styles.heroEyebrow} ${styles.kicker} ${styles.kickerOnDark}`}
                            >
                                {locale === "ru"
                                    ? "#Продуктовая аналитика"
                                    : "#Product analytics"}
                            </div>
                            <h1 className={styles.heroTitle}>
                                {locale === "ru" ? (
                                    <>
                                        БАНК ПРИНИМАЕТ{" "}
                                        <span className={styles.accent}>
                                            ПРОДУКТОВЫЕ РЕШЕНИЯ
                                        </span>{" "}
                                        БЫСТРЕЕ РЫНКА
                                    </>
                                ) : (
                                    <>
                                        A BANK MAKES{" "}
                                        <span className={styles.accent}>
                                            PRODUCT DECISIONS
                                        </span>{" "}
                                        FASTER THAN THE MARKET
                                    </>
                                )}
                            </h1>
                            <p className={styles.heroSubtitle}>
                                {locale === "ru"
                                    ? "10 AI-агентов непрерывно анализируют предложения 21 банка по 8 продуктовым доменам. Аналитика за секунды - для каждой роли в банке."
                                    : "10 AI agents continuously analyze offers from 21 banks across 8 product domains. Analytics arrive in seconds for every role inside the bank."}
                            </p>

                            <div className={styles.heroMetrics}>
                                {heroMetrics.map((metric) => (
                                    <div
                                        key={metric.value}
                                        className={styles.heroMetric}
                                    >
                                        <div className={styles.heroMetricValue}>
                                            {metric.value}
                                        </div>
                                        <div className={styles.heroMetricLabel}>
                                            {metric.label[locale]}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <aside
                            className={styles.heroRail}
                            aria-label={
                                locale === "ru"
                                    ? "Рыночные сигналы"
                                    : "Market signals"
                            }
                        >
                            <div
                                className={`${styles.heroRailLabel} ${styles.kicker} ${styles.kickerOnDark}`}
                            >
                                {locale === "ru"
                                    ? "#Контур рынка"
                                    : "#Market contour"}
                            </div>
                            <div className={styles.heroSignals}>
                                {heroSignals.map((signal) => (
                                    <div
                                        key={signal.tag.en}
                                        className={styles.heroSignal}
                                    >
                                        <div className={styles.heroSignalTag}>
                                            {signal.tag[locale]}
                                        </div>
                                        <p className={styles.heroSignalText}>
                                            {signal.text[locale]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </aside>
                    </div>

                    <div className={styles.heroTicker}>
                        <div
                            className={`${styles.heroTickerLabel} ${styles.kicker} ${styles.kickerOnDark}`}
                        >
                            {locale === "ru"
                                ? "#Домены под наблюдением"
                                : "#Tracked domains"}
                        </div>
                        <div className={styles.heroTickerViewport}>
                            <div className={styles.heroTickerTrack}>
                                {tickerItems.map((item, index) => (
                                    <span
                                        key={`${item}-${index}`}
                                        className={styles.heroTickerItem}
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={`${styles.sectionLabel} ${styles.kicker}`}>
                        {sectionLabels.change[locale]}
                    </div>
                    <h2 className={styles.sectionTitle}>
                        {locale === "ru" ? (
                            <>
                                ОТ РУЧНОГО ОБЗОРА{" "}
                                <span className={styles.accent}>
                                    К НЕПРЕРЫВНОЙ АНАЛИТИКЕ
                                </span>
                            </>
                        ) : (
                            <>
                                FROM MANUAL REVIEW TO{" "}
                                <span className={styles.accent}>
                                    CONTINUOUS ANALYTICS
                                </span>
                            </>
                        )}
                    </h2>

                    <div className={styles.compareWrap}>
                        <div className={styles.compareGrid}>
                            <div
                                className={`${styles.compareColumn} ${styles.compareBefore}`}
                            >
                                <div className={styles.compareLabel}>
                                    {locale === "ru" ? "Сейчас" : "Today"}
                                </div>
                                {beforeItems.map((item) => (
                                    <div
                                        key={item.text.ru}
                                        className={styles.compareItem}
                                    >
                                        <span className={styles.compareMarker}>
                                            &gt;
                                        </span>
                                        <span>
                                            {renderCompareText(item, locale)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div
                                className={`${styles.compareColumn} ${styles.compareAfter}`}
                            >
                                <div className={styles.compareLabel}>
                                    {locale === "ru"
                                        ? "С AI-агентами"
                                        : "With AI agents"}
                                </div>
                                {afterItems.map((item) => (
                                    <div
                                        key={item.text.ru}
                                        className={styles.compareItem}
                                    >
                                        <span className={styles.compareMarker}>
                                            &gt;
                                        </span>
                                        <span>
                                            {renderCompareText(item, locale)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionMuted}`}>
                <div className={styles.container}>
                    <div className={`${styles.sectionLabel} ${styles.kicker}`}>
                        {sectionLabels.cases[locale]}
                    </div>
                    <h2 className={styles.sectionTitle}>
                        {locale === "ru" ? (
                            <>
                                КАК ЭТО РАБОТАЕТ{" "}
                                <span className={styles.accent}>
                                    НА ПРАКТИКЕ
                                </span>
                            </>
                        ) : (
                            <>
                                HOW IT WORKS{" "}
                                <span className={styles.accent}>
                                    IN PRACTICE
                                </span>
                            </>
                        )}
                    </h2>

                    <div className={styles.cardGrid}>
                        {scenarios.map((scenario) => {
                            const isOpen = scenario.id === openScenarioId;

                            return (
                                <Fragment key={scenario.id}>
                                    <button
                                        type="button"
                                        className={`${styles.cardButton} ${isOpen ? styles.cardButtonActive : ""}`}
                                        onClick={() =>
                                            setOpenScenarioId(
                                                isOpen ? null : scenario.id
                                            )
                                        }
                                        aria-expanded={isOpen}
                                    >
                                        <span className={styles.cardNumber}>
                                            {String(scenario.id).padStart(
                                                2,
                                                "0"
                                            )}
                                        </span>
                                        <span className={styles.cardTitle}>
                                            {scenario.title[locale]}
                                        </span>
                                        <span className={styles.cardResult}>
                                            {scenario.result[locale]}
                                        </span>
                                    </button>

                                    {isOpen ? (
                                        <div className={styles.expandedCard}>
                                            <p className={styles.expandedStory}>
                                                {scenario.story[locale]}
                                            </p>
                                            <div
                                                className={
                                                    styles.expandedOutcome
                                                }
                                            >
                                                {scenario.outcome[locale]}
                                            </div>
                                            <div
                                                className={styles.expandedMeta}
                                            >
                                                {locale === "ru"
                                                    ? "Работает агент:"
                                                    : "Powered by agent:"}{" "}
                                                <span>
                                                    {
                                                        agents.find(
                                                            (agent) =>
                                                                agent.id ===
                                                                scenario.agentId
                                                        )?.name[locale]
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    ) : null}
                                </Fragment>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className={`${styles.statSection} ${styles.dotBg}`}>
                <div className={styles.container}>
                    <div className={styles.statsGrid}>
                        {stats.map((stat) => (
                            <div key={stat.value}>
                                <div className={styles.statValue}>
                                    {stat.value}
                                    <span
                                        className={`${styles.statAccent} ${"suffix" in stat && stat.suffix ? styles.statAccentCentered : ""}`}
                                    >
                                        {typeof stat.accent === "string"
                                            ? stat.accent
                                            : stat.accent[locale]}
                                    </span>
                                    {"suffix" in stat && stat.suffix ? (
                                        <span className={styles.statSuffix}>
                                            {stat.suffix}
                                        </span>
                                    ) : null}
                                </div>
                                <div className={styles.statLabel}>
                                    {stat.label[locale]}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={`${styles.sectionLabel} ${styles.kicker}`}>
                        {sectionLabels.roles[locale]}
                    </div>
                    <h2 className={styles.sectionTitle}>
                        {locale === "ru" ? (
                            <>
                                КАЖДАЯ РОЛЬ{" "}
                                <span className={styles.accent}>
                                    ПОЛУЧАЕТ СВОЕ
                                </span>
                            </>
                        ) : (
                            <>
                                EVERY ROLE{" "}
                                <span className={styles.accent}>
                                    GETS ITS OWN VIEW
                                </span>
                            </>
                        )}
                    </h2>

                    <div className={styles.rolesGrid}>
                        {roles.map((role) => {
                            const isActive = role.id === activeRoleId;

                            return (
                                <button
                                    key={role.id}
                                    type="button"
                                    className={`${styles.roleButton} ${isActive ? styles.roleButtonActive : ""}`}
                                    onClick={() =>
                                        setActiveRoleId(
                                            isActive ? null : role.id
                                        )
                                    }
                                    aria-expanded={isActive}
                                >
                                    <span className={styles.roleName}>
                                        {role.label[locale]}
                                    </span>
                                    <span className={styles.roleHint}>
                                        {role.hint[locale]}
                                    </span>
                                    <span className={styles.roleCount}>
                                        {isActive
                                            ? locale === "ru"
                                                ? "Свернуть"
                                                : "Collapse"
                                            : locale === "ru"
                                              ? `${role.agents.length} агентов ->`
                                              : `${role.agents.length} agents ->`}
                                    </span>
                                </button>
                            );
                        })}

                        {activeRole ? (
                            <div className={styles.roleExpanded}>
                                <div className={styles.roleExpandedLabel}>
                                    {locale === "ru"
                                        ? `Агенты для роли "${activeRole.label[locale]}"`
                                        : `Agents for "${activeRole.label[locale]}"`}
                                </div>
                                <div className={styles.rolePills}>
                                    {activeRole.agents.map((agentId) => {
                                        const agent = agents.find(
                                            (entry) => entry.id === agentId
                                        );

                                        return agent ? (
                                            <span
                                                key={agent.id}
                                                className={styles.rolePill}
                                            >
                                                {agent.name[locale]}
                                            </span>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </section>

            <section className={`${styles.section} ${styles.sectionMuted}`}>
                <div className={styles.container}>
                    <div className={`${styles.sectionLabel} ${styles.kicker}`}>
                        {sectionLabels.agents[locale]}
                    </div>
                    <h2 className={styles.sectionTitle}>
                        {locale === "ru" ? (
                            <>
                                10 АГЕНТОВ.{" "}
                                <span className={styles.accent}>
                                    ОТ ДАННЫХ ДО РЕШЕНИЙ.
                                </span>
                            </>
                        ) : (
                            <>
                                10 AGENTS.{" "}
                                <span className={styles.accent}>
                                    FROM DATA TO DECISION.
                                </span>
                            </>
                        )}
                    </h2>

                    {(["specialist", "orchestrator", "executive"] as const).map(
                        (layer) => (
                            <div key={layer} className={styles.agentLayer}>
                                <div className={styles.layerLabel}>
                                    {layerLabels[layer][locale]}
                                </div>
                                <div className={styles.agentsGrid}>
                                    {agents
                                        .filter(
                                            (agent) => agent.layer === layer
                                        )
                                        .map((agent) => (
                                            <article
                                                key={agent.id}
                                                className={styles.agentCard}
                                            >
                                                <div
                                                    className={
                                                        styles.agentNumber
                                                    }
                                                >
                                                    {String(agent.id).padStart(
                                                        2,
                                                        "0"
                                                    )}
                                                </div>
                                                <h3
                                                    className={styles.agentName}
                                                >
                                                    {agent.name[locale]}
                                                </h3>
                                                <p className={styles.agentDesc}>
                                                    {agent.desc[locale]}
                                                </p>
                                                <div
                                                    className={
                                                        styles.agentValue
                                                    }
                                                >
                                                    {agent.value[locale]}
                                                </div>
                                            </article>
                                        ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </section>

            <section className={styles.demoSection}>
                <div className={styles.container}>
                    <div className={styles.demoGrid}>
                        <article className="stack-panel-dark p-5 md:p-6">
                            <div className={styles.demoLabel}>
                                {locale === "ru"
                                    ? "Пилотный запуск"
                                    : "Pilot launch"}
                            </div>
                            <div className={styles.demoTitle}>
                                {locale === "ru"
                                    ? "ГОТОВЫ ВИДЕТЬ РЫНОК В РЕАЛЬНОМ ВРЕМЕНИ?"
                                    : "READY TO SEE THE MARKET IN REAL TIME?"}
                            </div>
                            <div className={styles.demoText}>
                                {locale === "ru"
                                    ? "Соберем рабочий пилот быстрее, чем команда успеет подготовить ручной обзор."
                                    : "We can launch a working pilot faster than the team can prepare a manual competitor review."}
                            </div>
                        </article>

                        <article className="stack-panel bg-white p-5 md:p-6">
                            <div className={styles.demoCardLabel}>
                                {locale === "ru"
                                    ? "Пилот на данных MyFin"
                                    : "Pilot on MyFin data"}
                            </div>
                            <div className={styles.demoCardTitle}>
                                {locale === "ru"
                                    ? "2 недели до первой карты рынка"
                                    : "2 weeks to your first market map"}
                            </div>
                            <p className={styles.demoCardText}>
                                {locale === "ru"
                                    ? "Запускаем стартовый контур по 21 банку и 8 продуктовым доменам, чтобы команда сразу увидела ставки, сигналы и незакрытые ниши."
                                    : "We launch an initial contour across 21 banks and 8 product domains so the team immediately sees pricing, signals, and whitespace."}
                            </p>
                            <div className={styles.demoFacts}>
                                <span className={styles.demoFact}>
                                    {locale === "ru" ? "21 банк" : "21 banks"}
                                </span>
                                <span className={styles.demoFact}>
                                    {locale === "ru"
                                        ? "8 доменов"
                                        : "8 domains"}
                                </span>
                                <span className={styles.demoFact}>
                                    {locale === "ru" ? "2 недели" : "2 weeks"}
                                </span>
                            </div>
                        </article>
                    </div>

                    <div className={styles.demoFormWrap}>
                        <Suspense
                            fallback={
                                <div className="stack-panel bg-white p-6 md:p-8" aria-hidden="true">
                                    <div className="h-9 w-56 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                    <div className="mt-6 grid gap-4 md:grid-cols-2">
                                        <div className="h-12 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                        <div className="h-12 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                        <div className="h-12 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                        <div className="h-12 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                    </div>
                                    <div className="mt-4 h-32 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                    <div className="mt-6 grid gap-3 md:grid-cols-2">
                                        <div className="h-14 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                        <div className="h-14 animate-pulse rounded bg-[rgba(0,0,0,.08)]" />
                                    </div>
                                </div>
                            }
                        >
                            <ContactForm defaultTopic="Product demo" />
                        </Suspense>
                    </div>
                </div>
            </section>
        </div>
    );
}
