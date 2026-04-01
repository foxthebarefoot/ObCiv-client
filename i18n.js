// ObCiv client-side internationalisation
"use strict";

const I18N = {
    ko: {
        title_tagline: "문명의 체계를 관찰(observation)하다",
        subtitle: "같은 사건을 종교는 '성스럽다'고, 경제는 '쓸모있다'고 읽는다.\n당신이 쓴 한 줄이 세계의 믿음이 된다.",
        title_attribution: "니클라스 루만의 사회체계이론에서 영감을 받음",
        seed_label: "시드:",
        seed_placeholder: "비워두면 랜덤",
        new_game: "새 게임",
        load_save: "불러오기",
        save_game: "저장",
        view_history: "연대기",
        hide_history: "연대기 닫기",
        load_error: "세이브 파일을 읽을 수 없습니다.",
        save_failed: "저장에 실패했습니다.",
        save_no_game: "서버에 진행 중인 게임이 없습니다. 페이지를 새로고침했거나 서버를 재시작했을 수 있습니다.",
        save_need_server: "브라우저가 서버에 연결하지 못했습니다. index.html을 파일로 직접 연 경우 저장이 되지 않습니다. 터미널에서 python run.py(또는 Flask 실행) 후 http://127.0.0.1:5000 같은 주소로 접속해 주세요.",
        quit: "종료",
        quit_confirm: "게임을 종료하고 타이틀로 돌아갑니다.",
        next_generation: "다음 세대",
        confirm: "확인",
        skip: "건너뛰기",
        continue_hint: "클릭하거나 Enter를 눌러 계속",
        gen_end: "이 세대의 이야기가 끝났다.",
        next_gen_btn: "다음 세대로",
        name_placeholder: "이름을 지어주세요",
        text_placeholder: "한 줄로 적어주세요",
        orphan_msg: "[이전 세대의 교리를 모른다]",
        quiet_years: "조용한 세월이 흘렀다.",
        something: "무언가",
        // header
        gen_header: "{gen}세대 — {role}",
        gen_header_with_calling: "{gen}세대 — 당신은 {calling}({role})입니다.",
        header_role_calling: "불림: 「{calling}」",
        role_calling_placeholder: "예: 칭호·부르는 방식 (개인 이름 아님)",
        sub_header: "{year}년째 {season}. {biome}. 인구 {pop}.",
        water_pct: "물 {pct}%",
        food_pct: "식량 {pct}%",
        shelter_pct: "거처 {pct}%",
        remaining: "남은 선택 {n}",
        // summary (이전 세대 vs 새 시대 구역)
        summary_past_header: "{gen}세대의 기억",
        summary_legacy_culture_header: "이 세대에 새로 자리 잡은 것",
        summary_legacy_infra_label: "공동 시설",
        summary_new_era_header: "새 시대",
        summary_role: "{gen}세대 — {role}으로 태어났다. {year}년째. 인구 {pop}.",
        // biome display
        biome: {
            river_valley: "강가 마을", highland: "산지 마을",
            coastal: "바닷가 마을", steppe: "초원 마을",
        },
        // differentiation modal
        diff_title: "문명의 전환",
        economy_start_headline: "경제의 시작",
        farming_start_headline: "땅에 씨를 뿌리기 시작했다",
        farming_pastoral_headline: "가축을 몰아 초원을 찾기 시작했다",
        farming_marginal_headline: "험한 골에 밭을 내기 시작했다",
        farming_milestone_body: "밭과 가축의 자리가 달라지기 시작한다.",
        trade_hub_intro_title: "교역의 길목",
        trade_hub_intro_body: "이 땅은 길이 열리기 쉬운 곳이다. 사람과 물자가 모여들 여지가 있다.",
        diff_body: "{parent}에서 {child}가 갈라져 나왔다. 세상이 달라지기 시작한다.",
        // language selector
        lang_label: "언어:",
        // doctrine panel row labels
        label_doctrine: "교리:",
        label_taboo: "금기:",
        label_ritual: "의례:",
        public_projects_panel_title: "공동 작업",
        public_projects_banner_title: "기념물·공동 시설",
        public_projects_banner_hint: "말과 믿음을 떠받치는 자리.",
        known_objects_banner_title: "한 번 알았던 사물",
        known_objects_banner_hint: "이름은 흐려져도 자리는 남는다. 망각된 곳은 다시 이름 붙이기 쉽다.",
        known_objects_forgotten: "이름 망각",
        coupling_title: "같은 사건을 각 체계는 이렇게 읽었다",
        voices_diverge: "목소리가 갈라졌다.",
        choice_voice_prompt: "이 중 누구의 목소리에 귀를 기울여 따라갈까?",
        history_title: "연대기",
        history_loading: "연대기를 불러오는 중...",
        history_empty: "아직 기록된 사건이 없다.",
        history_load_failed: "연대기를 불러오지 못했다.",
        history_meta: "{year}년째 {season}",
        history_gen_header: "— {gen}세대 —",
        history_event_legacy: "다음 세대에 남긴 말 — \"{text}\"",
        history_event_naming: "이름을 붙였다 - {trait} - {name}",
        history_event_naming_simple: "이름을 붙였다 — «{name}»",
        history_event_shock_memory: "위기에 대해 연대기에 남긴 말 — \"{text}\"",
        history_event_shock: "위기 — {name}. 인구 {pop_before}→{pop_after}.",
        history_event_crystallize: "{system}에 한 줄이 굳어졌다. (주제: {topic} · {stance})",
        history_event_crystallize_belief: "「{text}」 — 믿음이 굳어졌다.",
        history_event_dedifferentiation: "{absorbed}이(가) 무너져 {absorber}에 흡수되었다.",
        history_event_total_collapse: "모든 체계가 무너지고 한 무리만 남았다.",
        history_event_role_calling: "역할 호칭 — {role}: 「{calling}」",
        history_event_role_calling_decline: "불안이 커지며 {role}을(를) 어떻게 부를지 다시 묻는다.",
        history_dilemma_resolved: "갈림길 — {flavor} {favored}의 쪽을 택했다. (밀린 쪽: {disfavored}){bias}{note}",
        history_dilemma_deferred: "갈림길을 미뤘다. ({flavor})",
        history_dilemma_bias_note: " (한쪽으로만 계속 기울었다)",
        history_dilemma_player_note: " — 「{text}」",
        history_event_unknown: "기록된 사건 ({kind})",
        history_boon_unknown: "풍요·기회의 한때 — 유형: {type}",
        // tension & dilemma
        stability_label: "안정",
        stability_high: "공동체는 한 방향을 보고 있다.",
        stability_moderate: "목소리가 갈라지기 시작했다.",
        stability_low: "공동체 안에 균열이 깊어지고 있다.",
        stability_critical: "공동체가 흔들리고 있다. 곧 무너질지 모른다.",
        tension_title: "체계 간 긴장",
        dilemma_title: "갈림길",
        dilemma_favor: "{system}의 판단을 따르다",
        dilemma_defer: "결정을 미루다",
        dilemma_title_recurring: "다시 온 갈림길",
        dilemma_title_doctrine_revisit: "교리 앞의 갈림길",
        dilemma_text_placeholder_doctrine_revise: "개정할 때만 한 줄을 남긴다 (유지하면 비워도 된다)",
        tension_flavor_sacred_vs_useful: "신성한 것을 지킬 것인가, 쓸모 있게 쓸 것인가.",
        tension_flavor_profit_vs_sacred: "이윤과 신앙이 부딪친다.",
        tension_flavor_faith_vs_science: "기도에 맡길 것인가, 약에 맡길 것인가.",
        tension_flavor_power_vs_justice: "권력이 법 위에 서려 한다.",
        tension_flavor_trade_vs_security: "문을 열면 풍요, 닫으면 안전.",
        tension_flavor_market_vs_power: "장사꾼과 권력자가 부딪친다.",
        tension_flavor_profit_vs_health: "이익을 따를 것인가, 건강을 지킬 것인가.",
        tension_flavor_utility_vs_knowledge: "쓸모와 앎이 다른 길을 가리킨다.",
        tension_flavor_market_vs_regulation: "시장의 흐름과 법의 테두리가 부딪친다.",
        tension_flavor_knowledge_vs_force: "아는 것과 힘이 다른 답을 내놓는다.",
        tension_flavor_knowledge_vs_care: "배움과 돌봄이 서로 다른 처방을 내놓는다.",
        tension_flavor_knowledge_vs_law: "앎과 법이 엇갈린다.",
        tension_flavor_truth_vs_dogma: "진리 탐구와 교리 수호가 갈라진다.",
        tension_flavor_truth_vs_power: "진실과 권력이 다른 길을 가리킨다.",
        tension_flavor_force_vs_law: "칼과 법이 부딪친다.",
        tension_flavor_war_vs_healing: "전쟁터와 치유가 양립하기 어렵다.",
        tension_flavor_force_vs_politics: "무력과 정치가 주도권을 다툰다.",
        tension_flavor_war_vs_sacred: "전쟁과 성스러움이 충돌한다.",
        tension_flavor_justice_vs_power: "정의와 권력이 엇갈린다.",
        tension_flavor_law_vs_faith: "법과 신앙이 다른 판단을 내린다.",
        tension_flavor_science_vs_faith: "치료와 신앙이 갈라진다.",
        tension_flavor_health_vs_power: "건강과 권력이 부딪친다.",
        tension_flavor_power_vs_sacred: "권력과 신성이 다툰다.",
        tension_flavor_control_vs_force: "통제와 무력이 갈라진다.",
        tension_flavor_old_way_vs_new_sacred: "옛 방식과 새 질서 사이에서…",
        tension_flavor_old_way_vs_new_trade: "옛 방식과 새 질서 사이에서…",
        tension_flavor_old_way_vs_new_power: "옛 방식과 새 질서 사이에서…",
        tension_flavor_old_way_vs_force: "옛 방식과 칼이 부딪친다.",
        tension_flavor_old_way_vs_law: "관습과 법이 충돌한다.",
        tension_flavor_old_way_vs_healing: "옛 방식과 새 치유가 다툰다.",
        tension_flavor_generic_tension: "두 체계의 판단이 엇갈린다.",
        dilemma_text_placeholder: "사람들은 어떤 합의에 이르렀는가?",
        dilemma_motivation_question: "이 합의는 어디에서 나왔는가?",
        dilemma_write_submit: "이 말을 남긴다",
        legacy_prompt: "{role}(으)로서, 다음 세대에 남길 말이 있는가?",
        // 체계별 줄 태그(믿음/진단/원칙 등) — 내부 구분·도구용. UI 목록은 문장만 표시.
        _sl_doc: {
            원시체계: "믿음:", 종교: "교리:", 경제: "원칙:", 정치: "노선:",
            법: "조항:", 교육: "교훈:", 의료: "진단:", 군사: "교범:",
        },
        _sl_tab: {
            원시체계: "피함:", 종교: "금기:", 경제: "제한:", 정치: "금지:",
            법: "위법:", 교육: "금지:", 의료: "금지:", 군사: "금지:",
        },
        _sl_rit: {
            원시체계: "의례:", 종교: "의례:", 경제: "관례:", 정치: "의례:",
            법: "관례:", 교육: "관례:", 의료: "관례:", 군사: "의례:",
        },
    },
    en: {
        title_tagline: "Observe the systems of civilization",
        subtitle: "Each system reads the world differently.\nYour words shape what it believes.",
        title_attribution: "Inspired by Niklas Luhmann's social systems theory",
        seed_label: "Seed:",
        seed_placeholder: "Leave empty for random",
        new_game: "New Game",
        load_save: "Load Save",
        save_game: "Save",
        view_history: "Chronicle",
        hide_history: "Close Chronicle",
        load_error: "Could not read the save file.",
        save_failed: "Save failed.",
        save_no_game: "No active game on the server. Try refreshing, or the server may have restarted.",
        save_need_server: "Could not reach the server. If you opened the HTML file directly (file://), saving will not work. Run the app (e.g. python run.py) and open http://127.0.0.1:5000 in the browser.",
        quit: "Quit",
        quit_confirm: "End the game and return to the title?",
        next_generation: "Next Generation",
        confirm: "OK",
        skip: "Skip",
        continue_hint: "Click or press Enter to continue",
        gen_end: "This generation's story has ended.",
        next_gen_btn: "Next Generation",
        name_placeholder: "Enter a name",
        text_placeholder: "Write in one line",
        orphan_msg: "[Cannot see previous beliefs]",
        quiet_years: "Quiet years have passed.",
        something: "something",
        gen_header: "Gen {gen} — {role}",
        gen_header_with_calling: "Gen {gen} — you are known as {calling} ({role}).",
        header_role_calling: "Spoken of as: “{calling}”",
        role_calling_placeholder: "Title or form of address (not a personal name)",
        sub_header: "Year {year}, {season}. {biome}. Pop {pop}.",
        water_pct: "Water {pct}%",
        food_pct: "Food {pct}%",
        shelter_pct: "Shelter {pct}%",
        remaining: "Choices left: {n}",
        summary_past_header: "Memories of Gen {gen}",
        summary_legacy_culture_header: "What took hold this generation",
        summary_legacy_infra_label: "Common works",
        summary_new_era_header: "A new era",
        summary_role: "Gen {gen} — Born as {role}. Year {year}. Pop {pop}.",
        biome: {
            river_valley: "River Village", highland: "Highland Village",
            coastal: "Coastal Village", steppe: "Steppe Village",
        },
        diff_title: "A Turning Point",
        economy_start_headline: "The Dawn of Economy",
        farming_start_headline: "They began sowing seed in the earth",
        farming_pastoral_headline: "Herds began to move in search of pasture",
        farming_marginal_headline: "Thin plots were scratched into the high glens",
        farming_milestone_body: "The place of fields and herds begins to shift.",
        trade_hub_intro_title: "A Crossroads of Trade",
        trade_hub_intro_body: "This land opens to paths. People and goods may gather here more easily.",
        diff_body: "{child} has split from {parent}. The world begins to change.",
        lang_label: "Lang:",
        label_doctrine: "Doctrine:",
        label_taboo: "Taboo:",
        label_ritual: "Ritual:",
        public_projects_panel_title: "Common works",
        public_projects_banner_title: "Monuments & common works",
        public_projects_banner_hint: "Ground where words and beliefs take shape.",
        known_objects_banner_title: "Places once known",
        known_objects_banner_hint: "Names may fade; the place remains. Forgotten ones are easy to name again.",
        known_objects_forgotten: "name forgotten",
        coupling_title: "Each system reads the same event differently",
        voices_diverge: "The voices diverged.",
        choice_voice_prompt: "Whose voice will you follow among these?",
        history_title: "Chronicle",
        history_loading: "Loading chronicle...",
        history_empty: "No events are recorded yet.",
        history_load_failed: "Could not load chronicle.",
        history_meta: "Year {year}, {season}",
        history_gen_header: "— Generation {gen} —",
        history_event_legacy: "Last words for the next generation — \"{text}\"",
        history_event_naming: "A name was given - {trait} - {name}",
        history_event_naming_simple: "A name was given — «{name}»",
        history_event_shock_memory: "A line left in the chronicle about the crisis — \"{text}\"",
        history_event_shock: "Crisis — {name}. Population {pop_before}→{pop_after}.",
        history_event_crystallize: "A line hardened in {system}. (Topic: {topic} · {stance})",
        history_event_crystallize_belief: "A belief took hold — \"{text}\"",
        history_event_dedifferentiation: "{absorbed} collapsed and was absorbed into {absorber}.",
        history_event_total_collapse: "Every system fell away; only one band remained.",
        history_event_role_calling: "Title of role — {role}: “{calling}”",
        history_event_role_calling_decline: "As anxiety grows, people ask again what to call the {role}.",
        history_dilemma_resolved: "Crossroads — {flavor} The people sided with {favored}. (Set back: {disfavored}){bias}{note}",
        history_dilemma_deferred: "The crossroads was deferred. ({flavor})",
        history_dilemma_bias_note: " (The same side was favored again and again.)",
        history_dilemma_player_note: " — “{text}”",
        history_event_unknown: "Recorded event ({kind})",
        history_boon_unknown: "A time of fortune — type: {type}",
        // tension & dilemma
        stability_label: "Stability",
        stability_high: "The community speaks with one voice.",
        stability_moderate: "Voices are beginning to diverge.",
        stability_low: "Cracks are deepening within the community.",
        stability_critical: "The community is shaking. It may not hold.",
        tension_title: "Inter-System Tension",
        dilemma_title: "Crossroads",
        dilemma_favor: "Side with {system}",
        dilemma_defer: "Defer the decision",
        dilemma_title_recurring: "A Familiar Crossroads",
        dilemma_title_doctrine_revisit: "At the Doctrine's Crossroads",
        dilemma_text_placeholder_doctrine_revise: "Leave a line only when revising (leave empty to uphold)",
        tension_flavor_sacred_vs_useful: "Preserve the sacred, or use what is useful?",
        tension_flavor_profit_vs_sacred: "Profit clashes with faith.",
        tension_flavor_faith_vs_science: "Trust in prayer, or trust in medicine?",
        tension_flavor_power_vs_justice: "Power tries to stand above the law.",
        tension_flavor_trade_vs_security: "Open the gates for trade, or close them for safety?",
        tension_flavor_market_vs_power: "Merchants and rulers collide.",
        tension_flavor_profit_vs_health: "Follow profit, or protect health?",
        tension_flavor_utility_vs_knowledge: "Utility and knowledge point different ways.",
        tension_flavor_market_vs_regulation: "Market flow clashes with legal bounds.",
        tension_flavor_knowledge_vs_force: "Knowledge and force offer different answers.",
        tension_flavor_knowledge_vs_care: "Learning and care prescribe different remedies.",
        tension_flavor_knowledge_vs_law: "Knowledge and law point different ways.",
        tension_flavor_truth_vs_dogma: "Truth-seeking and dogma diverge.",
        tension_flavor_truth_vs_power: "Truth and power point different ways.",
        tension_flavor_force_vs_law: "The sword and the law collide.",
        tension_flavor_war_vs_healing: "War and healing cannot easily coexist.",
        tension_flavor_force_vs_politics: "Force and politics contest for dominance.",
        tension_flavor_war_vs_sacred: "War and the sacred clash.",
        tension_flavor_justice_vs_power: "Justice and power diverge.",
        tension_flavor_law_vs_faith: "Law and faith render different verdicts.",
        tension_flavor_science_vs_faith: "Medicine and faith diverge.",
        tension_flavor_health_vs_power: "Health and power collide.",
        tension_flavor_power_vs_sacred: "Power and the sacred contest.",
        tension_flavor_control_vs_force: "Control and brute force diverge.",
        tension_flavor_old_way_vs_new_sacred: "Between old ways and a new sacred order\u2026",
        tension_flavor_old_way_vs_new_trade: "Between old ways and a new trade order\u2026",
        tension_flavor_old_way_vs_new_power: "Between old ways and new authority\u2026",
        tension_flavor_old_way_vs_force: "Old ways clash with the sword.",
        tension_flavor_old_way_vs_law: "Custom and statute collide.",
        tension_flavor_old_way_vs_healing: "Old ways and new healing contest.",
        tension_flavor_generic_tension: "Two systems read the world differently.",
        dilemma_text_placeholder: "What settlement did the people reach?",
        dilemma_motivation_question: "Where did this consensus come from?",
        dilemma_write_submit: "Leave these words",
        legacy_prompt: "As a {role}, what words do you leave for the next generation?",
        // Per-system line tags — internal. List UI shows sentence text only.
        _sl_doc: {
            원시체계: "Belief:", 종교: "Doctrine:", 경제: "Principle:", 정치: "Line:",
            법: "Article:", 교육: "Lesson:", 의료: "Finding:", 군사: "Doctrine:",
        },
        _sl_tab: {
            원시체계: "Avoid:", 종교: "Taboo:", 경제: "Restriction:", 정치: "Ban:",
            법: "Unlawful:", 교육: "Ban:", 의료: "Warning:", 군사: "Ban:",
        },
        _sl_rit: {
            원시체계: "Rite:", 종교: "Ritual:", 경제: "Practice:", 정치: "Rite:",
            법: "Practice:", 교육: "Practice:", 의료: "Practice:", 군사: "Rite:",
        },
    },
};

/** 연대기 한 줄 — 서버 BOON_TYPES_TEXT / SHOCK_NAMES / topic 조각과 동기화 */
const HISTORY_DATA = {
    ko: {
        shock: {
            war: "전쟁", plague: "역병", famine: "기근", flood: "홍수", raid: "약탈",
            climate_shift: "기후변동", volcanic_eruption: "화산", earthquake: "지진",
            _default: "재난",
        },
        boon: {
            bumper_crop: "올해는 유난히 풍작이다.",
            immigrants: "먼 곳에서 사람들이 찾아와 정착했다.",
            trade_caravan: "교역 대상이 지나가며 물자를 남겼다.",
            trade_influx: "상인과 일꾼이 모여들었다.",
            pastoral_confederation: "여러 무리가 한 추장 아래로 모였다.",
            neighbor_integration: "가까운 무리가 한곳에 합쳐 살기로 했다.",
            village_absorption: "인근 마을이 우리 고을에 합류했다.",
            township_annexation: "주변 읍락이 통합되어 고을이 커졌다.",
            city_federation: "인근 도시가 연합에 가담하여 세력이 크게 늘었다.",
            spring_rain: "오랜 가뭄 끝에 비가 내렸다.",
            baby_boom: "아이가 많이 태어난 해였다.",
            peace_treaty: "이웃과 화평을 맺었다. 평화로운 시절이다.",
            new_land: "새로운 경작지를 발견했다.",
        },
        cycle: {
            trade_decline: "길이 드물어지고, 몰려들던 사람들이 흩어졌다.",
            trade_recovery: "무너졌던 길목이 다시 소리를 내기 시작한다.",
            pastoral_scatter: "한때 모였던 무리가 다시 제 갈래로 흩어졌다.",
            pastoral_union: "다시 한 추장 아래로 무리가 모였다.",
        },
        lex: {
            scarcity: "부족", abundance: "풍요", encounter: "만남", death: "죽음", birth: "탄생",
            weather: "날씨", discovery: "발견", conflict: "분쟁", illness: "질병",
            migration: "이주", construction: "건설", ceremony: "의례",
            feast: "잔치·나눔", omen: "징조", gift: "답례·예물", trace: "흔적",
            // 체계 전용 이벤트 카테고리
            heresy: "이단", pilgrimage: "순례", desecration: "모독", prophecy: "예언",
            debt: "빚", barter_dispute: "교환 분쟁", granary_crisis: "곳간 위기", tribute: "공납",
            succession: "계승", faction: "파벌", taxation: "징수", envoy: "사신",
            jurisdiction: "관할 다툼", theft: "도적", trial: "재판", taboo_breach: "금기 위반",
            rival_teaching: "가르침 다툼", apprenticeship: "전수", lost_knowledge: "실전", new_craft: "새 기술",
            epidemic: "역병", remedy: "치료", quarantine: "격리", poisoning: "중독",
            border_threat: "변경 위협", fortification: "축성", conscription: "징병", siege: "공성",
            water: "물", food: "식량", shelter: "거처", territory: "영토",
            material: "재료", knowledge: "지식",
            nature: "자연", animal: "짐승", stranger: "낯선 이", member: "동료",
            self: "스스로", spirit: "영혼",
        },
        codeStance: {
            원시체계: ["위험 쪽", "안전 쪽"], 종교: ["성(신성) 쪽", "속(속된) 쪽"],
            경제: ["유용 쪽", "무용 쪽"], 정치: ["권력 확보 쪽", "권력 상실 쪽"],
            법: ["합법 쪽", "불법 쪽"], 교육: ["앎 쪽", "무지 쪽"],
            의료: ["건강 쪽", "질병 쪽"], 군사: ["승리 쪽", "패배 쪽"],
        },
        role: {
            채집인: "채집인", 사냥꾼: "사냥꾼", 무당: "무당", 장로: "장로", 정찰꾼: "정찰꾼",
            "의례 집행자": "의례 집행자", 장례인: "장례인", "금기 감시자": "금기 감시자",
            농부: "농부", 도공: "도공", 교역인: "교역인", 어부: "어부", 족장: "족장",
            전령: "전령", 감시인: "감시인", 징수인: "징수인", 심판자: "심판자", 중재인: "중재인",
            이야기꾼: "이야기꾼", 도제: "도제", 약초꾼: "약초꾼", 간병인: "간병인",
            전사: "전사", 척후: "척후", 성벽공: "성벽공", 유랑민: "유랑민",
            "옛 사제": "옛 사제", 약탈자: "약탈자", 고아: "고아",
        },
    },
    en: {
        shock: {
            war: "war", plague: "plague", famine: "famine", flood: "flood", raid: "raid",
            climate_shift: "climate shift", volcanic_eruption: "volcano", earthquake: "earthquake",
            _default: "disaster",
        },
        boon: {
            bumper_crop: "This year's harvest was exceptionally bountiful.",
            immigrants: "People from afar have come and settled here.",
            trade_caravan: "A trade caravan passed through, leaving supplies.",
            trade_influx: "Merchants and laborers have gathered here.",
            pastoral_confederation: "Many bands have gathered under one chief.",
            neighbor_integration: "Nearby bands agreed to live together in one place.",
            village_absorption: "A neighboring village has joined our settlement.",
            township_annexation: "Surrounding townships have merged, expanding our domain.",
            city_federation: "A nearby city has joined the federation, greatly expanding our influence.",
            spring_rain: "After a long drought, the rain has come at last.",
            baby_boom: "Many children were born this year.",
            peace_treaty: "A peace was made with the neighbors. Tranquil times.",
            new_land: "New farmland has been discovered.",
        },
        cycle: {
            trade_decline: "The routes grow quiet; the crowds that gathered have drifted away.",
            trade_recovery: "The crossroads stirs again — voices and goods find their way back.",
            pastoral_scatter: "The gathered bands have split, each going its own way.",
            pastoral_union: "Once more the bands gather under a single chief.",
        },
        lex: {
            scarcity: "scarcity", abundance: "abundance", encounter: "encounter", death: "death",
            birth: "birth", weather: "weather", discovery: "discovery", conflict: "conflict",
            illness: "illness", migration: "migration", construction: "construction",
            ceremony: "ceremony", feast: "feast", omen: "omen", gift: "gift exchange", trace: "trail",
            // system-specific event categories
            heresy: "heresy", pilgrimage: "pilgrimage", desecration: "desecration", prophecy: "prophecy",
            debt: "debt", barter_dispute: "barter dispute", granary_crisis: "granary crisis", tribute: "tribute",
            succession: "succession", faction: "faction", taxation: "taxation", envoy: "envoy",
            jurisdiction: "jurisdiction", theft: "theft", trial: "trial", taboo_breach: "taboo breach",
            rival_teaching: "disputed teaching", apprenticeship: "apprenticeship", lost_knowledge: "lost knowledge", new_craft: "new craft",
            epidemic: "epidemic", remedy: "remedy", quarantine: "quarantine", poisoning: "poisoning",
            border_threat: "border threat", fortification: "fortification", conscription: "conscription", siege: "siege",
            water: "water", food: "food", shelter: "shelter", territory: "territory",
            material: "material", knowledge: "knowledge",
            nature: "nature", animal: "beast", stranger: "stranger", member: "kin",
            self: "self", spirit: "spirit",
        },
        codeStance: {
            원시체계: ["danger", "safety"], 종교: ["sacred", "profane"],
            경제: ["useful", "useless"], 정치: ["power gained", "power lost"],
            법: ["lawful", "unlawful"], 교육: ["knowledge", "ignorance"],
            의료: ["health", "disease"], 군사: ["victory", "defeat"],
        },
        role: {
            채집인: "Gatherer", 사냥꾼: "Hunter", 무당: "Shaman", 장로: "Elder", 정찰꾼: "Scout",
            "의례 집행자": "Ritualist", 장례인: "Undertaker", "금기 감시자": "Taboo Watcher",
            농부: "Farmer", 도공: "Potter", 교역인: "Trader", 어부: "Fisher", 족장: "Chieftain",
            전령: "Herald", 감시인: "Watchman", 징수인: "Collector", 심판자: "Judge", 중재인: "Mediator",
            이야기꾼: "Storyteller", 도제: "Apprentice", 약초꾼: "Herbalist", 간병인: "Caretaker",
            전사: "Warrior", 척후: "Outrider", 성벽공: "Mason", 유랑민: "Wanderer",
            "옛 사제": "Former Priest", 약탈자: "Raider", 고아: "Orphan",
        },
    },
};

const CHRONICLE_SEASONS = {
    ko: ["봄", "여름", "가을", "겨울"],
    en: ["Spring", "Summer", "Autumn", "Winter"],
};

const OBJECT_TYPE_LABELS = {
    ko: { plant: "식물", animal: "짐승", mineral: "광물", place: "장소" },
    en: { plant: "plant", animal: "animal", mineral: "mineral", place: "place" },
};

/** server.config TENSION_PAIR_FLAVORS — 정렬된 "체계:체계" 키 */
const TENSION_KEY_FLAVOR = {
    "경제:군사": "trade_vs_security",
    "경제:종교": "profit_vs_sacred",
    "경제:정치": "market_vs_power",
    "경제:의료": "profit_vs_health",
    "경제:교육": "utility_vs_knowledge",
    "경제:법": "market_vs_regulation",
    "교육:군사": "knowledge_vs_force",
    "교육:종교": "truth_vs_dogma",
    "교육:정치": "truth_vs_power",
    "교육:의료": "knowledge_vs_care",
    "교육:법": "knowledge_vs_law",
    "군사:법": "force_vs_law",
    "군사:의료": "war_vs_healing",
    "군사:정치": "force_vs_politics",
    "군사:종교": "war_vs_sacred",
    "법:정치": "justice_vs_power",
    "법:종교": "law_vs_faith",
    "의료:종교": "science_vs_faith",
    "의료:정치": "health_vs_power",
    "정치:종교": "power_vs_sacred",
    "원시체계:종교": "old_way_vs_new_sacred",
    "경제:원시체계": "old_way_vs_new_trade",
    "원시체계:정치": "old_way_vs_new_power",
    "군사:원시체계": "old_way_vs_force",
    "법:원시체계": "old_way_vs_law",
    "원시체계:의료": "old_way_vs_healing",
};

function historyRoleName(roleKey) {
    const lang = getLang();
    const r = (HISTORY_DATA[lang] || HISTORY_DATA.ko).role || {};
    return r[roleKey] || roleKey;
}

function historyTopicLabel(topicKey) {
    if (!topicKey) return t("something");
    const lang = getLang();
    const lex = (HISTORY_DATA[lang] || HISTORY_DATA.ko).lex || {};
    return topicKey.split(":").map(p => lex[p] || p).join(" · ");
}

function historyCrystallizeStance(systemKey, codePositive) {
    const lang = getLang();
    const cs = (HISTORY_DATA[lang] || HISTORY_DATA.ko).codeStance || {};
    const pair = cs[systemKey];
    if (!pair) return codePositive ? "+" : "−";
    return codePositive ? pair[0] : pair[1];
}

function tensionFlavorLine(tensionKey) {
    if (!tensionKey) return t("tension_flavor_generic_tension");
    const fk = TENSION_KEY_FLAVOR[tensionKey];
    if (fk) return t("tension_flavor_" + fk);
    return t("tension_flavor_generic_tension");
}

/** 연대기 표시용 인구: 정수로만 절사(버림). */
function formatChroniclePop(p) {
    if (p == null) return "?";
    const n = Number(p);
    if (!Number.isFinite(n)) return String(p);
    return String(Math.trunc(n));
}

/**
 * 연대기 API 항목 → 서사 한 줄 (내부 event 코드 대신 플레이어가 읽을 문장).
 * @param {object} item
 * @returns {string|null} null이면 game.js 기본 처리(legacy 등)
 */
function formatChronicleLine(item) {
    const kind = item.event || "";
    const lang = getLang();
    const HD = HISTORY_DATA[lang] || HISTORY_DATA.ko;

    if (kind === "shock") {
        const sn = item.shock_type || "";
        const name = (HD.shock && (HD.shock[sn] || HD.shock._default)) || sn;
        return tf("history_event_shock", {
            name,
            pop_before: item.pop_before != null ? formatChroniclePop(item.pop_before) : "?",
            pop_after: item.pop_after != null ? formatChroniclePop(item.pop_after) : "?",
        });
    }
    if (kind === "boon") {
        const bt = item.boon_type;
        const line = HD.boon && bt ? HD.boon[bt] : null;
        if (line) return line;
        return tf("history_boon_unknown", { type: bt || "?" });
    }
    if (kind === "crystallize") {
        if (item.doctrine_text) {
            return tf("history_event_crystallize_belief", { text: item.doctrine_text });
        }
        const sys = (typeof tSystem === "function" ? tSystem(item.system) : null) || item.system || "?";
        const topic = historyTopicLabel(item.topic_key || "");
        const stance = historyCrystallizeStance(item.system, !!item.code_positive);
        return tf("history_event_crystallize", { system: sys, topic, stance });
    }
    if (kind === "differentiation") {
        const parent = (typeof tSystem === "function" ? tSystem(item.parent) : null) || item.parent || "?";
        const child = (typeof tSystem === "function" ? tSystem(item.child) : null) || item.child || "?";
        return tf("diff_body", { parent, child });
    }
    if (kind === "dedifferentiation") {
        const ab = (typeof tSystem === "function" ? tSystem(item.absorbed) : null) || item.absorbed || "?";
        const ar = (typeof tSystem === "function" ? tSystem(item.absorber) : null) || item.absorber || "?";
        return tf("history_event_dedifferentiation", { absorbed: ab, absorber: ar });
    }
    if (kind === "total_collapse") {
        return t("history_event_total_collapse");
    }
    if (kind === "role_calling_set") {
        return tf("history_event_role_calling", {
            role: historyRoleName(item.role || ""),
            calling: item.calling || "",
        });
    }
    if (kind === "role_calling_decline_prompt") {
        return tf("history_event_role_calling_decline", { role: historyRoleName(item.role || "") });
    }
    if (kind === "dilemma_resolved") {
        const flavor = tensionFlavorLine(item.tension_key || "");
        const favored = (typeof tSystem === "function" ? tSystem(item.favored) : null) || item.favored || "?";
        const disfavored = (typeof tSystem === "function" ? tSystem(item.disfavored) : null) || item.disfavored || "?";
        const bias = item.bias_warning ? t("history_dilemma_bias_note") : "";
        const note = item.player_text ? tf("history_dilemma_player_note", { text: item.player_text }) : "";
        return tf("history_dilemma_resolved", { flavor, favored, disfavored, bias, note });
    }
    if (kind === "dilemma_deferred") {
        return tf("history_dilemma_deferred", { flavor: tensionFlavorLine(item.tension_key || "") });
    }
    if (kind === "trade_cycle" || kind === "pastoral_cycle") {
        const ck = item.kind || "";
        const line = HD.cycle && ck ? HD.cycle[ck] : null;
        if (line) return line;
        return kind + (ck ? ": " + ck : "");
    }
    return null;
}

let _currentLang = "en";

function getLang() {
    if (typeof gameState !== "undefined" && gameState && gameState.lang) {
        return gameState.lang;
    }
    return _currentLang;
}

function setLang(lang) {
    _currentLang = lang;
}

function t(key) {
    const lang = getLang();
    const dict = I18N[lang] || I18N.ko;
    const val = dict[key];
    if (val !== undefined) return val;
    return I18N.ko[key] || key;
}

function tf(key, vars) {
    let text = t(key);
    if (typeof text !== "string") return text;
    for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp("\\{" + k + "\\}", "g"), v);
    }
    return text;
}

function tBiome(biome) {
    const lang = getLang();
    const dict = I18N[lang] || I18N.ko;
    return (dict.biome && dict.biome[biome]) || biome;
}

/** Map server system_key (Korean internal name) to display name. */
function tSystem(systemKey) {
    // system names come from gameState.society.systems which are already translated by server
    if (typeof gameState !== "undefined" && gameState && gameState.society) {
        const sys = (gameState.society.systems || []).find(s => s.name === systemKey);
        if (sys) return sys.name;
    }
    // Fallback: English mappings
    const enMap = {
        "원시체계": "Primitive", "종교": "Religion", "경제": "Economy",
        "정치": "Politics", "법": "Law", "교육": "Education",
        "의료": "Medicine", "군사": "Military",
    };
    return (getLang() === "en" ? enMap[systemKey] : null) || systemKey;
}

/**
 * 체계별 줄 태그 문자열 — I18N._sl_* 매핑. UI 본문에는 쓰지 않고 내부·추후용.
 * kind: "doctrine" | "taboo" | "ritual", systemKey: 서버 system_key (한글 내부명)
 */
function structureKindLabel(kind, systemKey) {
    const dict = I18N[getLang()] || I18N.ko;
    const mapKey = kind === "doctrine" ? "_sl_doc" : kind === "taboo" ? "_sl_tab" : "_sl_rit";
    const map = dict[mapKey] || {};
    const fb = kind === "doctrine" ? "label_doctrine" : kind === "taboo" ? "label_taboo" : "label_ritual";
    return (systemKey && map[systemKey]) || t(fb);
}
