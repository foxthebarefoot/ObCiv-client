// ObCiv Client
"use strict";

let gameState = null;
let historyPanelOpen = false;
let historyLoading = false;
let historyError = "";
let historyItems = [];

// --- API helpers ---
const API_BASE = window.location.hostname === "localhost"
    ? ""
    : "https://api.obciv.kimminjae.me";

async function api(method, path, body) {
    const opts = { method, headers: { "Content-Type": "application/json" } };
    if (body !== undefined) opts.body = JSON.stringify(body);
    const res = await fetch(API_BASE + path, opts);
    return res.json();
}

// --- Screens ---
const $title = document.getElementById("title-screen");
const $game = document.getElementById("game-screen");
const $summary = document.getElementById("summary-screen");

function showScreen(screen) {
    $title.style.display = "none";
    $game.style.display = "none";
    $summary.style.display = "none";
    screen.style.display = "block";
}

// --- Language selector ---
const langButtons = document.querySelectorAll(".lang-btn");
let selectedLang = "en";

function syncLangUI() {
    setLang(selectedLang);
    document.documentElement.lang = selectedLang;
    langButtons.forEach(b => {
        b.classList.toggle("active", b.dataset.lang === selectedLang);
        b.setAttribute("aria-pressed", b.dataset.lang === selectedLang);
    });
    applyTitleLang();
}

langButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedLang = btn.dataset.lang;
        syncLangUI();
    });
});

function applyTitleLang() {
    document.getElementById("title-tagline").textContent = t("title_tagline");
    document.getElementById("subtitle").textContent = t("subtitle");
    document.getElementById("title-attribution").textContent = t("title_attribution");
    document.getElementById("seed-label").textContent = t("seed_label");
    document.getElementById("seed-field").placeholder = t("seed_placeholder");
    document.getElementById("btn-new-game").textContent = t("new_game");
    document.getElementById("btn-load-save").textContent = t("load_save");
    document.getElementById("lang-label").textContent = t("lang_label");
    document.getElementById("btn-continue").textContent = t("next_generation");
}

// --- New Game ---
document.getElementById("btn-new-game").addEventListener("click", async () => {
    const seed = document.getElementById("seed-field").value.trim() || undefined;
    const lang = selectedLang;
    const data = await api("POST", "/api/new_game", { seed, lang });
    if (data.status === "ok") {
        gameState = data.state;
        showScreen($game);
        render();
        maybeShowOpeningModal().then(() => maybeShowTradeHubModal());
    }
});

// --- Load existing ---
(async function init() {
    const data = await api("GET", "/api/state");
    if (data.status === "ok") {
        gameState = data.state;
        if (gameState.lang) {
            selectedLang = gameState.lang;
        }
        syncLangUI();
        showScreen($game);
        render();
        maybeShowOpeningModal().then(() => maybeShowTradeHubModal());
    } else {
        syncLangUI();
    }
})();

// --- Render ---
function render() {
    if (!gameState) return;
    renderHeader();
    renderSystems();
    renderTensions();
    renderDoctrines();
    renderCoupling();
    renderEvent();
    renderInput();
    renderDilemma();
    renderGenerationEnd();
    renderTimeline();
    renderHistoryPanel();
}

function renderHeader() {
    const s = gameState;
    const gen = s.society.generation;
    const role = s.player.role;
    const year = s.world.year;
    const season = s.world.season;
    const pop = s.society.population;
    const biome = tBiome(s.world.biome);
    const remaining = s.player.actions_remaining;

    const res = s.world.resources || {};
    const rn = s.world.resources_narrative;
    const water = res.water != null ? res.water : 0.5;
    const food = res.food != null ? res.food : 0.5;
    const shelter = res.shelter != null ? res.shelter : 0.12;

    // Phase 2: 자원을 서사 텍스트로 표시 (숫자 대신)
    const stabilityText = s.social_stability != null
        ? (s.social_stability >= 0.7 ? t("stability_high")
           : s.social_stability >= 0.4 ? t("stability_moderate")
           : s.social_stability >= 0.2 ? t("stability_low")
           : t("stability_critical"))
        : "";

    let resourcesHtml;
    if (rn) {
        const overallCls = rn.overall === "crisis" ? "resource-low" : rn.overall === "low" ? "resource-warn" : "";
        resourcesHtml = `
            <div class="resources-narrative ${overallCls}">
                <span>${esc(rn.water)}</span>
                <span>${esc(rn.food)}</span>
            </div>`;
    } else {
        resourcesHtml = `
            <div class="resources-bar">
                <span class="${water < 0.3 ? 'resource-low' : ''}">${tf("water_pct", {pct: (water * 100).toFixed(0)})}</span>
                <span class="${food < 0.3 ? 'resource-low' : ''}">${tf("food_pct", {pct: (food * 100).toFixed(0)})}</span>
                <span class="${shelter < 0.25 ? 'resource-low' : ''}">${tf("shelter_pct", {pct: (shelter * 100).toFixed(0)})}</span>
            </div>`;
    }

    document.getElementById("header").innerHTML = `
        <div class="header-top">
            <div class="header-main">${esc(tf("gen_header", {gen, role}))}</div>
            <div class="header-actions">
                <button class="btn-history" id="btn-history">${esc(historyPanelOpen ? t("hide_history") : t("view_history"))}</button>
                <button class="btn-save" id="btn-save">${esc(t("save_game"))}</button>
                <button class="btn-quit" id="btn-quit">${esc(t("quit"))}</button>
            </div>
        </div>
        <div class="header-sub">${esc(tf("sub_header", {year, season, biome, pop}))}</div>
        ${resourcesHtml}
        <div class="resources-bar">
            ${stabilityText ? `<span class="${s.social_stability < 0.3 ? 'resource-low' : s.social_stability < 0.6 ? 'resource-warn' : ''}">${esc(stabilityText)}</span>` : ""}
            <span>${tf("remaining", {n: remaining})}</span>
        </div>
        ${s.resource_hint ? `<div class="resource-hint">${esc(s.resource_hint)}</div>` : ""}
    `;
    document.getElementById("btn-history").addEventListener("click", toggleHistoryPanel);
    document.getElementById("btn-save").addEventListener("click", saveGame);
    document.getElementById("btn-quit").addEventListener("click", quitGame);
}

function renderSystems() {
    const systems = gameState.society.systems || [];
    let html = systems.map(s => {
        const tag = `<span class="system-tag">${esc(s.name)} (${s.code_labels.map(l => esc(l)).join("/")})</span>`;
        const guide = s.play_guide
            ? `<div class="system-play-guide">${esc(s.play_guide)}</div>`
            : "";
        return `<div class="system-block">${tag}${guide}</div>`;
    }).join("");

    const ctx = gameState.context_text;
    if (ctx) {
        html += `<div class="context-text">${esc(ctx)}</div>`;
    }
    document.getElementById("systems-bar").innerHTML = html;
}

const _SYS_CSS_VAR = {
    "원시체계": "--sys-primitive", "종교": "--sys-religion", "경제": "--sys-economy",
    "정치": "--sys-politics", "법": "--sys-law", "교육": "--sys-education",
    "의료": "--sys-medicine", "군사": "--sys-military",
};

function renderDoctrines() {
    const el = document.getElementById("doctrines-panel");
    const parts = [];

    // Group by system_key
    const groups = {};
    const order = [];
    function ensureGroup(item) {
        const k = item.system_key || "";
        if (!groups[k]) {
            groups[k] = { name: item.system || "", key: k, doctrines: [], taboos: [], rituals: [] };
            order.push(k);
        }
        return groups[k];
    }
    for (const d of gameState.doctrines || []) ensureGroup(d).doctrines.push(d);
    for (const tb of gameState.taboos || []) ensureGroup(tb).taboos.push(tb);
    for (const r of gameState.rituals || []) ensureGroup(r).rituals.push(r);

    for (const k of order) {
        const g = groups[k];
        const count = g.doctrines.length + g.taboos.length + g.rituals.length;
        const colorVar = _SYS_CSS_VAR[k] || "--dim";
        const sysDisplay = g.name ? esc(tSystem(k)) : "?";
        let inner = "";
        for (const d of g.doctrines) {
            const cls = d.is_player_text ? "player-text" : "template-text";
            inner += `<div class="doctrine-item"><span class="${cls}">${esc(d.text)}</span></div>`;
        }
        for (const tb of g.taboos) {
            const cls = tb.is_player_text ? "player-text" : "template-text";
            inner += `<div class="taboo-item"><span class="${cls}">${esc(tb.text)}</span></div>`;
        }
        for (const r of g.rituals) {
            const cls = r.is_player_text ? "player-text" : "template-text";
            inner += `<div class="ritual-item"><span class="${cls}">${esc(r.text)}</span></div>`;
        }
        parts.push(`<details class="system-group" open>
            <summary style="color:var(${colorVar})">${sysDisplay} <span class="system-group-count">(${count})</span></summary>
            <div class="system-group-content">${inner}</div>
        </details>`);
    }

    const pp = gameState.public_projects || [];
    const knownObjs = gameState.known_objects || [];
    if (pp.length > 0 || knownObjs.length > 0) {
        let settlementExtra = "";
        if (pp.length > 0) {
            const ppGroups = {};
            const ppOrder = [];
            for (const p of pp) {
                const k = p.system_key || "";
                if (!ppGroups[k]) {
                    ppGroups[k] = [];
                    ppOrder.push(k);
                }
                ppGroups[k].push(p);
            }
            const ppBlocks = ppOrder.map(k => {
                const items = ppGroups[k];
                const count = items.length;
                const colorVar = _SYS_CSS_VAR[k] || "--dim";
                const sysDisplay = k ? esc(tSystem(k)) : (items[0].system ? esc(items[0].system) : "?");
                let inner = "";
                for (const p of items) {
                    const layers = (p.layers && p.layers > 1)
                        ? ` <span class="public-project-layers">×${p.layers}</span>` : "";
                    inner += `<div class="public-project-item"><span class="template-text">${esc(p.label)}</span>${layers}</div>`;
                }
                return `<details class="system-group" open>
            <summary style="color:var(${colorVar})">${sysDisplay} <span class="system-group-count">(${count})</span></summary>
            <div class="system-group-content">${inner}</div>
        </details>`;
            }).join("");
            settlementExtra += `
            <div class="public-projects-block" role="region" aria-label="${esc(t("public_projects_banner_title"))}">
                <div class="public-projects-title">${esc(t("public_projects_banner_title"))}</div>
                <div class="public-projects-hint">${esc(t("public_projects_banner_hint"))}</div>
                <div class="public-projects-by-system">${ppBlocks}</div>
            </div>`;
        }
        if (knownObjs.length > 0) {
            let kInner = "";
            for (const row of knownObjs) {
                const fog = row.status === "forgotten";
                const trait = (row.trait != null && row.trait !== "") ? row.trait : (row.label || "");
                let givenName = row.name;
                if (givenName == null || givenName === "") {
                    givenName = row.label || "";
                }
                const badge = fog
                    ? `<span class="known-object-badge">${esc(t("known_objects_forgotten"))}</span>`
                    : "";
                kInner += `<div class="known-object-item${fog ? " known-object-forgotten" : ""}">`;
                if (trait) {
                    kInner += `<div class="known-object-trait template-text">${esc(trait)}</div>`;
                }
                if (givenName) {
                    kInner += `<div class="known-object-name-line"><span class="known-object-name player-text">「${esc(givenName)}」</span>${badge ? " " + badge : ""}</div>`;
                } else if (fog) {
                    kInner += `<div class="known-object-name-line">${badge}</div>`;
                }
                kInner += `</div>`;
            }
            settlementExtra += `
            <div class="known-objects-block" role="region" aria-label="${esc(t("known_objects_banner_title"))}">
                <div class="known-objects-title">${esc(t("known_objects_banner_title"))}</div>
                <div class="known-objects-hint">${esc(t("known_objects_banner_hint"))}</div>
                <div class="known-objects-list">${kInner}</div>
            </div>`;
        }
        parts.push(`<div class="settlement-extra-wrap">${settlementExtra}</div>`);
    }

    if (gameState.is_orphan) {
        parts.push(`<div class="template-text orphan-panel-note" style="padding:0.3rem 0">${esc(t("orphan_msg"))}</div>`);
    }

    el.innerHTML = parts.join("");
}

function renderCoupling() {
    const el = document.getElementById("coupling-panel");
    if (!el) return;
    const parts = [];
    const st = gameState.split_tension;
    if (st) {
        parts.push(`<div class="split-tension-hint">${esc(st)}</div>`);
    }
    const rows = gameState.coupling || [];
    if (rows.length > 0) {
        parts.push(`<div class="coupling-title">${esc(t("coupling_title"))}</div>`);
        for (const row of rows) {
            if (row.divergence) {
                parts.push(`<div class="coupling-divergence">${esc(t("voices_diverge"))}</div>`);
                continue;
            }
            let line = `<span class="c-sys">${esc(row.system)}</span> — 「${esc(row.reading)}」`;
            if (row.doctrine_echo) {
                line += `<div class="doctrine-echo">${esc(tf("doctrine_echo", {system: row.system, doctrine: row.doctrine_echo}))}</div>`;
            }
            parts.push(`<div class="coupling-line">${line}</div>`);
        }
    }
    el.innerHTML = parts.join("");
    el.style.display = parts.length ? "block" : "none";
}

function renderEvent() {
    const el = document.getElementById("event-panel");
    const pi = gameState.pending_input;

    if (!pi || !pi.event_text) {
        el.innerHTML = "";
        return;
    }

    el.innerHTML = `<div class="event-text fade-in">${esc(pi.event_text)}</div>`;
}

function renderInput() {
    const choicesEl = document.getElementById("choices-panel");
    const inputEl = document.getElementById("input-panel");
    choicesEl.innerHTML = "";
    inputEl.style.display = "none";

    const pi = gameState.pending_input;
    if (!pi) return;

    if (pi.type === "choice") {
        const promptLine = `<div class="choice-voice-prompt">${esc(t("choice_voice_prompt"))}</div>`;
        const buttons = (pi.choices || []).map(c => {
            return `<button class="choice-btn" data-action="${esc(c.action)}"><span class="choice-btn-inner">${formatChoiceButtonContent(c)}</span></button>`;
        }).join("");
        choicesEl.innerHTML = promptLine + buttons;

        choicesEl.querySelectorAll(".choice-btn").forEach(btn => {
            btn.addEventListener("click", () => submitChoice(btn.dataset.action));
        });
    }
    else if (pi.type === "name_object") {
        inputEl.style.display = "block";
        const desc = pi.object_description || t("something");
        inputEl.innerHTML = `
            <div class="input-prompt">${esc(pi.prompt)}</div>
            <div class="template-text" style="margin-bottom:0.5rem">(${esc(desc)})</div>
            <div class="input-row">
                <input type="text" id="name-input" maxlength="50" placeholder="${esc(t("name_placeholder"))}">
                <button id="btn-name">${esc(t("confirm"))}</button>
            </div>
        `;
        const nameInput = document.getElementById("name-input");
        document.getElementById("btn-name").addEventListener("click", () => {
            const name = nameInput.value.trim();
            if (name) submitName(pi.object_id, name, desc);
        });
        nameInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                const name = nameInput.value.trim();
                if (name) submitName(pi.object_id, name, desc);
            }
        });
        nameInput.focus();
    }
    else if (pi.type === "write_role_calling") {
        inputEl.style.display = "block";
        const maxLen = Math.min(Number(pi.max_len) || 80, 200);
        inputEl.innerHTML = `
            <div class="input-prompt">${esc(pi.prompt)}</div>
            <div class="input-row">
                <input type="text" id="role-calling-input" maxlength="${maxLen}" placeholder="${esc(t("role_calling_placeholder"))}">
                <button id="btn-role-calling">${esc(t("confirm"))}</button>
            </div>
        `;
        const rin = document.getElementById("role-calling-input");
        document.getElementById("btn-role-calling").addEventListener("click", () => {
            const text = rin.value.trim();
            if (text) submitRoleCalling(text, pi.role);
        });
        rin.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                const text = rin.value.trim();
                if (text) submitRoleCalling(text, pi.role);
            }
        });
        rin.focus();
    }
    else if (pi.type === "write_shock_narrative") {
        inputEl.style.display = "block";
        const textType = pi.type.replace("write_", "");
        inputEl.innerHTML = `
            <div class="input-prompt">${esc(pi.prompt)}</div>
            <div class="input-row">
                <input type="text" id="text-input" maxlength="200" placeholder="${esc(t("text_placeholder"))}">
                <button type="button" id="btn-text">${esc(t("confirm"))}</button>
                <button type="button" id="btn-shock-skip" class="btn-secondary">${esc(t("skip"))}</button>
            </div>
        `;
        const textInput = document.getElementById("text-input");
        document.getElementById("btn-text").addEventListener("click", () => {
            const text = textInput.value.trim();
            if (text) submitText(null, text, textType);
        });
        document.getElementById("btn-shock-skip").addEventListener("click", () => {
            skipShockNarrative();
        });
        textInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                const text = textInput.value.trim();
                if (text) submitText(null, text, textType);
            }
        });
        textInput.focus();
    }
    else if (pi.type === "write_doctrine" || pi.type === "write_taboo" || pi.type === "write_ritual") {
        inputEl.style.display = "block";
        const structureId = pi.structure_id || pi.doctrine_id;
        const textType = pi.type.replace("write_", "");
        inputEl.innerHTML = `
            <div class="input-prompt">${esc(pi.prompt)}</div>
            <div class="input-row">
                <input type="text" id="text-input" maxlength="200" placeholder="${esc(t("text_placeholder"))}">
                <button id="btn-text">${esc(t("confirm"))}</button>
            </div>
        `;
        const textInput = document.getElementById("text-input");
        document.getElementById("btn-text").addEventListener("click", () => {
            const text = textInput.value.trim();
            if (text) submitText(structureId, text, textType);
        });
        textInput.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                const text = textInput.value.trim();
                if (text) submitText(structureId, text, textType);
            }
        });
        textInput.focus();
    }
}

function renderGenerationEnd() {
    const el = document.getElementById("generation-end");
    const pi = gameState.pending_input;

    if (pi && (pi.type === "generation_end" || pi.type === "write_legacy")) {
        el.style.display = "block";
        el.innerHTML = `
            <div class="gen-end-text">${esc(t("gen_end"))}</div>
            <button id="btn-next-gen">${esc(t("next_gen_btn"))}</button>
        `;
        document.getElementById("btn-next-gen").addEventListener("click", nextGeneration);
    } else {
        el.style.display = "none";
    }
}

function renderSummary(result) {
    showScreen($summary);
    const el = document.getElementById("summary-content");

    const gen = result.generation;
    const role = result.role;
    const year = result.year;
    const pop = result.population;
    const summaries = result.summaries || [];
    const newEraSummaries = result.new_era_summaries || [];
    const legacy = result.legacy_culture || {};
    const legDoc = legacy.doctrines || [];
    const legTab = legacy.taboos || [];
    const legRit = legacy.rituals || [];
    const legInf = legacy.infrastructure || [];
    const hasLegacyCulture = legDoc.length + legTab.length + legRit.length + legInf.length > 0;

    let html = `<section class="summary-section summary-past" aria-labelledby="summary-past-heading">`;
    html += `<h2 id="summary-past-heading" class="summary-header summary-past-header">${esc(tf("summary_past_header", {gen: gen - 1}))}</h2>`;
    if (summaries.length > 0) {
        html += summaries.map(s => `<div class="summary-line">${esc(s)}</div>`).join("");
    } else {
        html += `<div class="summary-line">${esc(t("quiet_years"))}</div>`;
    }
    if (hasLegacyCulture) {
        html += `<div class="summary-legacy-block">`;
        html += `<h3 class="summary-legacy-main">${esc(t("summary_legacy_culture_header"))}</h3>`;
        if (legDoc.length > 0) {
            html += `<div class="summary-legacy-subtitle">${esc(t("label_doctrine"))}</div>`;
            html += legDoc.map(it => `<div class="summary-line summary-legacy-line"><span class="summary-legacy-sys">${esc(it.system)}</span> ${esc(it.text)}</div>`).join("");
        }
        if (legTab.length > 0) {
            html += `<div class="summary-legacy-subtitle">${esc(t("label_taboo"))}</div>`;
            html += legTab.map(it => `<div class="summary-line summary-legacy-line"><span class="summary-legacy-sys">${esc(it.system)}</span> ${esc(it.text)}</div>`).join("");
        }
        if (legRit.length > 0) {
            html += `<div class="summary-legacy-subtitle">${esc(t("label_ritual"))}</div>`;
            html += legRit.map(it => `<div class="summary-line summary-legacy-line"><span class="summary-legacy-sys">${esc(it.system)}</span> ${esc(it.text)}</div>`).join("");
        }
        if (legInf.length > 0) {
            html += `<div class="summary-legacy-subtitle">${esc(t("summary_legacy_infra_label"))}</div>`;
            html += legInf.map(it => {
                const layerNote = it.layers > 1 ? ` (${it.layers})` : "";
                return `<div class="summary-line summary-legacy-line"><span class="summary-legacy-sys">${esc(it.system)}</span> ${esc(it.label)}${esc(layerNote)}</div>`;
            }).join("");
        }
        html += `</div>`;
    }
    html += `</section>`;

    html += `<section class="summary-section summary-new-era" aria-labelledby="summary-new-era-heading">`;
    html += `<h2 id="summary-new-era-heading" class="summary-header summary-new-era-header">${esc(t("summary_new_era_header"))}</h2>`;
    if (newEraSummaries.length > 0) {
        html += newEraSummaries.map(s => `<div class="summary-line">${esc(s)}</div>`).join("");
    }
    html += `<div class="summary-line summary-new-era-body">${esc(tf("summary_role", {gen, role, year, pop}))}</div>`;
    html += `</section>`;

    el.innerHTML = html;

    document.getElementById("btn-continue").textContent = t("next_generation");
    document.getElementById("btn-continue").onclick = () => {
        showScreen($game);
        render();
    };
}

function renderTensions() {
    const el = document.getElementById("tension-panel");
    if (!el) return;
    const tensions = gameState.tensions || [];
    if (tensions.length === 0) {
        el.innerHTML = "";
        el.style.display = "none";
        return;
    }
    el.style.display = "block";
    const rows = tensions.map(t => {
        const pct = Math.round(t.strength * 100);
        const filled = Math.round(t.strength * 5);
        const bar = "\u2588".repeat(filled) + "\u2591".repeat(5 - filled);
        const cls = t.strength >= 0.6 ? "tension-high" : t.strength >= 0.3 ? "tension-mid" : "tension-low";
        const unresolvedTag = t.unresolved > 0 ? ` <span class="tension-unresolved">(${t.unresolved})</span>` : "";
        const flavorText = t.flavor_text ? `<div class="tension-flavor-text">${esc(t.flavor_text)}</div>` : "";
        return `<div class="tension-row ${cls}"><span class="tension-pair">\u26a1 ${esc(t.system_a)} \u2194 ${esc(t.system_b)}</span> <span class="tension-bar">${bar}</span> <span class="tension-pct">${pct}%</span>${unresolvedTag}${flavorText}</div>`;
    });
    el.innerHTML = `<div class="tension-header">${esc(t("tension_title"))}</div>${rows.join("")}`;
}

function renderDilemma() {
    const el = document.getElementById("dilemma-panel");
    if (!el) return;
    const pi = gameState.pending_input;

    if (!pi || pi.type !== "dilemma") {
        el.style.display = "none";
        return;
    }

    el.style.display = "block";
    const hasConcrete = pi.side_a && pi.side_b;

    if (hasConcrete) {
        // 구체화된 딜레마 레이아웃
        const narrativeHtml = (pi.narrative || "").split("\n").map(line =>
            line.trim() ? `<p>${esc(line)}</p>` : "<br>"
        ).join("");

        el.innerHTML = `
            <div class="dilemma-box fade-in${pi.is_recurring ? ' dilemma-recurring' : ''}${pi.is_doctrine_revisit ? ' dilemma-doctrine-revisit' : ''}">
                <div class="dilemma-title">\u2694 ${esc(t(pi.is_doctrine_revisit ? "dilemma_title_doctrine_revisit" : (pi.is_recurring ? "dilemma_title_recurring" : "dilemma_title")))}</div>
                <div class="dilemma-narrative">${narrativeHtml}</div>
                <hr class="dilemma-divider">
                <div class="dilemma-question">${esc(pi.question || "")}</div>
                <div class="dilemma-text-input-wrap">
                    <input type="text" id="dilemma-text-input" class="dilemma-text-input" maxlength="200"
                        placeholder="${esc(t(pi.is_doctrine_revisit ? "dilemma_text_placeholder_doctrine_revise" : "dilemma_text_placeholder") || "")}" />
                </div>
                <div class="dilemma-motivation-question">${esc(t("dilemma_motivation_question") || "")}</div>
                <div class="dilemma-actions">
                    <button class="dilemma-btn dilemma-side-a" data-key="${esc(pi.tension_key)}" data-favored="${esc(pi.side_a.system_key)}">${esc(pi.side_a.label)}</button>
                    <button class="dilemma-btn dilemma-side-b" data-key="${esc(pi.tension_key)}" data-favored="${esc(pi.side_b.system_key)}">${esc(pi.side_b.label)}</button>
                </div>
                <div class="dilemma-actions dilemma-actions-secondary">
                    <button class="dilemma-btn dilemma-defer-btn" data-key="${esc(pi.tension_key)}">${esc(t("dilemma_defer"))}</button>
                </div>
            </div>
        `;

        el.querySelectorAll(".dilemma-side-a, .dilemma-side-b").forEach(btn => {
            btn.addEventListener("click", () => {
                const textInput = document.getElementById("dilemma-text-input");
                const text = textInput ? textInput.value.trim() : "";
                resolveDilemma(btn.dataset.key, btn.dataset.favored, text);
            });
        });
    } else {
        // 폴백: 기존 추상적 레이아웃
        const flavorKey = `tension_flavor_${pi.flavor || "generic_tension"}`;
        const flavorText = t(flavorKey) || "";
        const promptText = pi.prompt || pi.narrative || "";

        el.innerHTML = `
            <div class="dilemma-box fade-in">
                <div class="dilemma-title">\u2694 ${esc(t("dilemma_title"))}</div>
                <div class="dilemma-narrative">${esc(pi.narrative || "")}</div>
                ${flavorText ? `<div class="dilemma-flavor">${esc(flavorText)}</div>` : ""}
                ${promptText !== pi.narrative ? `<div class="dilemma-prompt">${esc(promptText)}</div>` : ""}
                <div class="dilemma-text-input-wrap">
                    <input type="text" id="dilemma-text-input" class="dilemma-text-input" maxlength="200"
                        placeholder="${esc(t("dilemma_text_placeholder") || "")}" />
                </div>
                <div class="dilemma-strength">${t("tension_title")}: ${Math.round((pi.strength || 0) * 100)}%</div>
                <div class="dilemma-actions">
                    <button class="dilemma-btn dilemma-favor-a" data-key="${esc(pi.tension_key)}" data-favored="${esc(pi.system_a_key)}">${esc(tf("dilemma_favor", {system: pi.system_a}))}</button>
                    <button class="dilemma-btn dilemma-favor-b" data-key="${esc(pi.tension_key)}" data-favored="${esc(pi.system_b_key)}">${esc(tf("dilemma_favor", {system: pi.system_b}))}</button>
                    <button class="dilemma-btn dilemma-defer-btn" data-key="${esc(pi.tension_key)}">${esc(t("dilemma_defer"))}</button>
                </div>
            </div>
        `;

        el.querySelectorAll(".dilemma-favor-a, .dilemma-favor-b").forEach(btn => {
            btn.addEventListener("click", () => {
                const textInput = document.getElementById("dilemma-text-input");
                const text = textInput ? textInput.value.trim() : "";
                resolveDilemma(btn.dataset.key, btn.dataset.favored, text);
            });
        });
    }

    el.querySelector(".dilemma-defer-btn").addEventListener("click", () => resolveDilemma(pi.tension_key, null, ""));
}

function renderTimeline() {
    const el = document.getElementById("timeline-panel");
    if (!el) return;
    // Pull significant events from tensions + tick_results for display
    const tensions = gameState.tensions || [];
    const stability = gameState.social_stability;
    if (tensions.length === 0 && (stability == null || stability >= 0.95)) {
        el.innerHTML = "";
        return;
    }
    // Timeline is minimal for now — just a stability summary
    if (stability != null && stability < 0.8) {
        const stabPct = Math.round(stability * 100);
        const cls = stability < 0.3 ? "timeline-critical" : stability < 0.6 ? "timeline-warning" : "";
        el.innerHTML = `<div class="timeline-summary ${cls}">${t("stability_label")}: ${stabPct}% \u2014 ${tensions.length > 0 ? tensions.length + " " + t("tension_title").toLowerCase() : ""}</div>`;
    } else {
        el.innerHTML = "";
    }
}

function formatHistoryMeta(item) {
    const tick = item.tick != null ? item.tick : 0;
    const year = Math.floor(tick / 4) + 1;
    const lang = getLang();
    const seasons = CHRONICLE_SEASONS[lang] || CHRONICLE_SEASONS.ko;
    const season = seasons[tick % 4] || seasons[0];
    return tf("history_meta", { year, season });
}

function formatHistoryText(item) {
    const kind = item.event || "";
    if (kind === "legacy") {
        return tf("history_event_legacy", { text: item.text || "" });
    }
    if (kind === "naming") {
        let trait = item.object_trait || "";
        if (!trait && item.object_id) {
            const lang = getLang();
            const typeKey = item.object_id.replace(/_\d+$/, "");
            const labels = OBJECT_TYPE_LABELS[lang] || OBJECT_TYPE_LABELS.ko;
            trait = labels[typeKey] || typeKey;
        }
        if (trait) {
            return tf("history_event_naming", { trait, name: item.name || "?" });
        }
        return tf("history_event_naming_simple", { name: item.name || "?" });
    }
    if (kind === "shock_memory") {
        return tf("history_event_shock_memory", { text: item.text || "" });
    }
    const chronicle = formatChronicleLine(item);
    if (chronicle !== null) return chronicle;
    if (item.text) return item.text;
    if (item.name) return `«${item.name}»`;
    return tf("history_event_unknown", { kind: kind || "…" });
}

function renderHistoryPanel() {
    const el = document.getElementById("history-panel");
    if (!el) return;
    if (!historyPanelOpen) {
        el.style.display = "none";
        el.innerHTML = "";
        return;
    }

    el.style.display = "block";
    if (historyLoading) {
        el.innerHTML = `<div class="history-box"><div class="history-title">${esc(t("history_title"))}</div><div class="history-empty">${esc(t("history_loading"))}</div></div>`;
        return;
    }
    if (historyError) {
        el.innerHTML = `<div class="history-box"><div class="history-title">${esc(t("history_title"))}</div><div class="history-empty">${esc(t("history_load_failed"))}</div></div>`;
        return;
    }
    if (!historyItems.length) {
        el.innerHTML = `<div class="history-box"><div class="history-title">${esc(t("history_title"))}</div><div class="history-empty">${esc(t("history_empty"))}</div></div>`;
        return;
    }

    let lastGen = null;
    const rows = historyItems.slice().reverse().map(item => {
        let genHeader = "";
        if (item.generation !== lastGen) {
            lastGen = item.generation;
            genHeader = `<div class="history-gen-header">${esc(tf("history_gen_header", { gen: item.generation }))}</div>`;
        }
        return `${genHeader}
        <div class="history-item history-${esc(item.event || "other")}">
            <div class="history-meta">${esc(formatHistoryMeta(item))}</div>
            <div class="history-text">${esc(formatHistoryText(item))}</div>
        </div>`;
    }).join("");
    el.innerHTML = `
        <div class="history-box">
            <div class="history-title">${esc(t("history_title"))}</div>
            <div class="history-list">${rows}</div>
        </div>
    `;
}

async function loadHistory() {
    historyLoading = true;
    historyError = "";
    renderHistoryPanel();
    try {
        const data = await api("GET", "/api/history");
        if (data.status === "ok") {
            historyItems = Array.isArray(data.history) ? data.history : [];
        } else {
            historyError = "load_failed";
        }
    } catch (_) {
        historyError = "load_failed";
    } finally {
        historyLoading = false;
        renderHistoryPanel();
    }
}

async function toggleHistoryPanel() {
    historyPanelOpen = !historyPanelOpen;
    render();
    if (historyPanelOpen) {
        await loadHistory();
        render();
    }
}

async function resolveDilemma(tensionKey, favored, text) {
    // 즉시 딜레마 패널 숨기기
    const dp = document.getElementById("dilemma-panel");
    if (dp) dp.style.display = "none";

    const body = { tension_key: tensionKey };
    if (favored) body.favored = favored;
    if (text) body.text = text;
    const data = await api("POST", "/api/resolve_dilemma", body);
    if (data.status === "ok" || data.state) {
        gameState = data.state;
        render();
    }
}

// --- API actions ---
async function submitChoice(action) {
    const data = await api("POST", "/api/choice", { action });
    if (data.status === "ok") {
        gameState = data.state;
        const tr = data.tick_results || [];
        for (const c of tr.filter(r => r.type === "consequence")) {
            await showConsequence(c);
        }
        for (const b of tr.filter(r => r.type === "belief_loss")) {
            await showConsequence({ text: b.text });
        }
        for (const p of tr.filter(r => r.type === "public_project_decay")) {
            await showConsequence({ text: p.text });
        }
        for (const s of tr.filter(r => r.type === "shock")) {
            for (const line of (s.loss_notices || [])) {
                await showConsequence({ text: line });
            }
        }
        for (const r of tr) {
            const mk = narrativeModalKind(r);
            if (mk && NARRATIVE_MODAL_KEYS[mk]) {
                await showWorldEventModal(r);
            }
        }
        if (data.time_passage) {
            await showTimePassage(data.time_passage);
        }
        const diffs = (data.differentiations && data.differentiations.length)
            ? data.differentiations
            : (data.differentiation ? [data.differentiation] : []);
        for (const d of diffs) {
            await showDifferentiation(d);
        }
        render();
    }
}

function openingDismissStorageKey() {
    if (!gameState || !gameState.world) return null;
    const s = gameState.world.seed;
    return "obciv_opening_dismissed_" + String(s != null ? s : "none");
}

function maybeShowOpeningModal() {
    const o = gameState && gameState.opening_modal;
    if (!o || !o.location) return Promise.resolve();
    const key = openingDismissStorageKey();
    if (key && sessionStorage.getItem(key) === "1") return Promise.resolve();
    return showOpeningModal(o).then(() => {
        if (gameState) gameState.opening_modal = null;
        if (key) sessionStorage.setItem(key, "1");
    });
}

function tradeHubDismissStorageKey() {
    if (!gameState || !gameState.world) return null;
    const s = gameState.world.seed;
    return "obciv_trade_hub_intro_" + String(s != null ? s : "none");
}

function maybeShowTradeHubModal() {
    if (!gameState || !gameState.world || !gameState.world.trade_hub) return Promise.resolve();
    if (gameState.world.trade_flow_active === false) return Promise.resolve();
    const key = tradeHubDismissStorageKey();
    if (key && sessionStorage.getItem(key) === "1") return Promise.resolve();
    return showTradeHubIntroModal().then(() => {
        if (key) sessionStorage.setItem(key, "1");
    });
}

function showTradeHubIntroModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay fade-in";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "trade-hub-intro-title");
    overlay.innerHTML = `
        <div class="differentiation-modal has-milestones event-boon-modal trade-hub-intro-modal" aria-labelledby="trade-hub-intro-title">
            <div class="economy-start-headline" id="trade-hub-intro-title">${esc(t("trade_hub_intro_title"))}</div>
            <div class="diff-body">${esc(t("trade_hub_intro_body"))}</div>
            <div class="continue-hint">${esc(t("continue_hint"))}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    return waitForContinue(20000).then(() => overlay.remove());
}

const NARRATIVE_MODAL_KEYS = {
    trade_influx: true,
    neighbor_integration: true,
    village_absorption: true,
    township_annexation: true,
    city_federation: true,
    pastoral_confederation: true,
    trade_decline: true,
    trade_recovery: true,
    pastoral_scatter: true,
    pastoral_union: true,
};

function narrativeModalKind(r) {
    if (r.type === "boon") return r.boon_type;
    return r.type;
}

function showWorldEventModal(r) {
    if (!r || !r.name || !r.text) return Promise.resolve();
    const kind = narrativeModalKind(r);
    let extraCls = " is-trade-boon";
    if (kind === "trade_decline") extraCls = " is-decline-modal";
    else if (kind === "pastoral_scatter") extraCls = " is-scatter-modal";
    else if (kind === "pastoral_union" || kind === "pastoral_confederation" || kind === "neighbor_integration" || kind === "village_absorption" || kind === "township_annexation" || kind === "city_federation") extraCls = " is-pastoral-boon";
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay fade-in";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "world-event-title");
    overlay.innerHTML = `
        <div class="differentiation-modal has-milestones event-boon-modal${extraCls}" aria-labelledby="world-event-title">
            <div class="economy-start-headline" id="world-event-title">${esc(r.name)}</div>
            <div class="diff-body">${esc(r.text)}</div>
            <div class="continue-hint">${esc(t("continue_hint"))}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    return waitForContinue(18000).then(() => overlay.remove());
}

function showOpeningModal(o) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay fade-in";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "opening-modal-location");
    overlay.innerHTML = `
        <div class="opening-modal">
            <p class="opening-location" id="opening-modal-location">${esc(o.location)}</p>
            <div class="opening-body">
                <p>${esc(o.role_perspective)}</p>
                <p>${esc(o.no_names)}</p>
            </div>
            <div class="continue-hint">${esc(t("continue_hint"))}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    return waitForContinue(180000).then(() => overlay.remove());
}

function farmingHeadlineKeyFromDiff(diff) {
    const m = diff.farming_milestone;
    if (m === "pastoral") return "farming_pastoral_headline";
    if (m === "marginal") return "farming_marginal_headline";
    if (m === "agriculture") return "farming_start_headline";
    if (m === "none") return null;
    if (diff.farming_start) return "farming_start_headline";
    return null;
}

function showStandardDifferentiationModal(diff) {
    const choicesEl = document.getElementById("choices-panel");
    const inputEl = document.getElementById("input-panel");
    choicesEl.innerHTML = "";
    inputEl.style.display = "none";

    const title = t("diff_title");
    const body = tf("diff_body", { parent: diff.parent || "", child: diff.child || "" });
    const guideBlock = diff.guide
        ? `<div class="diff-guide">${esc(diff.guide)}</div>`
        : "";

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay fade-in";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "diff-modal-title");
    overlay.innerHTML = `
        <div class="differentiation-modal" aria-labelledby="diff-modal-title">
            <div class="diff-title" id="diff-modal-title">${esc(title)}</div>
            <div class="diff-body">${esc(body)}</div>
            ${guideBlock}
            <div class="continue-hint">${esc(t("continue_hint"))}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    return waitForContinue(15000).then(() => overlay.remove());
}

function showFarmingMilestoneModal(farmingKey) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay fade-in";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "farming-milestone-title");
    overlay.innerHTML = `
        <div class="differentiation-modal farming-milestone-modal" aria-labelledby="farming-milestone-title">
            <div class="diff-title" id="farming-milestone-title">${esc(t(farmingKey))}</div>
            <div class="diff-body">${esc(t("farming_milestone_body"))}</div>
            <div class="continue-hint">${esc(t("continue_hint"))}</div>
        </div>
    `;
    document.body.appendChild(overlay);
    return waitForContinue(15000).then(() => overlay.remove());
}

function showDifferentiation(diff) {
    const farmingKey = farmingHeadlineKeyFromDiff(diff);
    const first = showStandardDifferentiationModal(diff);
    if (farmingKey) {
        return first.then(() => showFarmingMilestoneModal(farmingKey));
    }
    return first;
}

function waitForContinue() {
    return new Promise(resolve => {
        let done = false;
        const finish = () => {
            if (done) return;
            done = true;
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("click", onClick);
            resolve();
        };
        const onKey = (e) => { if (e.key === "Enter" || e.key === " ") finish(); };
        const onClick = () => finish();
        document.addEventListener("keydown", onKey);
        document.addEventListener("click", onClick);
    });
}

function showConsequence(c) {
    if (!c || !c.text) return Promise.resolve();
    const eventEl = document.getElementById("event-panel");
    const choicesEl = document.getElementById("choices-panel");
    choicesEl.innerHTML = "";
    eventEl.innerHTML = `
        <div class="consequence-text fade-in">${esc(c.text)}</div>
        <div class="continue-hint">${esc(t("continue_hint"))}</div>
    `;
    return waitForContinue(10000);
}

function showTimePassage(tp) {
    if (!tp || tp.ticks <= 1) return Promise.resolve();

    const eventEl = document.getElementById("event-panel");
    const choicesEl = document.getElementById("choices-panel");
    const inputEl = document.getElementById("input-panel");
    choicesEl.innerHTML = "";
    inputEl.style.display = "none";

    let html = `<div class="time-passage fade-in">${esc(tp.text)}`;
    if (tp.notable && tp.notable.length > 0) {
        html += `<div class="time-notable">${tp.notable.map(n => esc(n)).join("<br>")}</div>`;
    }
    html += `</div><div class="continue-hint">${esc(t("continue_hint"))}</div>`;
    eventEl.innerHTML = html;

    renderHeader();
    renderSystems();
    renderDoctrines();

    return waitForContinue(10000);
}

async function submitName(objectId, name, objectTrait = "") {
    const data = await api("POST", "/api/name_object", {
        object_id: objectId,
        name,
        object_trait: objectTrait,
    });
    if (data.status === "ok") {
        gameState = data.state;
        render();
    }
}

async function submitText(structureId, text, textType) {
    const data = await api("POST", "/api/write_text", {
        structure_id: structureId, text, text_type: textType,
    });
    if (data.status === "ok") {
        gameState = data.state;
        render();
    }
}

async function skipShockNarrative() {
    const data = await api("POST", "/api/write_text", {
        structure_id: null,
        text: "",
        text_type: "shock_narrative",
        skip: true,
    });
    if (data.status === "ok") {
        gameState = data.state;
        render();
    }
}

async function submitRoleCalling(text, role) {
    const data = await api("POST", "/api/role_calling", { text, role });
    if (data.status === "ok") {
        gameState = data.state;
        render();
    }
}

async function nextGeneration() {
    const data = await api("POST", "/api/next_generation");
    if (data.status === "ok") {
        gameState = data.state;
        const gr = data.generation_result || {};
        const diffs = gr.differentiations || [];
        for (const d of diffs) {
            await showDifferentiation(d);
        }
        renderSummary(gr);
    }
}

async function quitGame() {
    if (!confirm(t("quit_confirm"))) return;
    await api("POST", "/api/reset");
    gameState = null;
    showScreen($title);
}

// --- Save (download JSON via fetch — works with correct filename; <a href="/api/export"> breaks on file://) ---
async function saveGame() {
    let filename = "obciv_save.json";
    if (gameState && gameState.world && gameState.world.seed != null) {
        filename = `obciv_${gameState.world.seed}.json`;
    }
    try {
        const res = await fetch(API_BASE + "/api/export", { method: "GET" });
        if (res.status === 404) {
            let detail = "";
            try {
                const data = await res.json();
                if (data.message === "no game") detail = "\n" + t("save_no_game");
                else if (data.message) detail = "\n" + data.message;
            } catch (_) { /* ignore */ }
            alert(t("save_failed") + detail);
            return;
        }
        if (!res.ok) {
            alert(t("save_failed") + "\nHTTP " + res.status);
            return;
        }
        const cd = res.headers.get("Content-Disposition");
        if (cd) {
            const m = cd.match(/filename="([^"]+)"/) || cd.match(/filename=([^;\s]+)/);
            if (m) {
                try {
                    filename = decodeURIComponent(m[1].replace(/^"|"$/g, ""));
                } catch (_) {
                    filename = m[1].replace(/^"|"$/g, "");
                }
            }
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    } catch (e) {
        alert(t("save_failed") + "\n" + t("save_need_server"));
    }
}

// --- Load (upload JSON from title screen) ---
const btnLoadSave = document.getElementById("btn-load-save");
const fileLoad = document.getElementById("file-load");

btnLoadSave.addEventListener("click", () => fileLoad.click());

fileLoad.addEventListener("change", async () => {
    const file = fileLoad.files[0];
    if (!file) return;
    const form = new FormData();
    form.append("save", file);
    try {
        const resp = await fetch(API_BASE + "/api/import", { method: "POST", body: form });
        const data = await resp.json();
        if (data.status === "ok") {
            gameState = data.state;
            if (gameState.lang) {
                selectedLang = gameState.lang;
                syncLangUI();
            }
            showScreen($game);
            render();
            maybeShowOpeningModal().then(() => maybeShowTradeHubModal());
        } else {
            alert(t("load_error") + "\n" + (data.message || ""));
        }
    } catch (e) {
        alert(t("load_error"));
    }
    fileLoad.value = "";
});

// --- Choice line: "[체계] (화자 → 대상) · 본문" ---
function parseChoiceDisplayText(text) {
    const raw = String(text || "").trim();
    if (!raw) return { speaker: "", target: "", action: "" };

    let sep = " -> ";
    let i = raw.indexOf(sep);
    let sepLen = sep.length;
    if (i < 0) {
        sep = "->";
        i = raw.indexOf(sep);
        sepLen = 2;
    }

    if (i >= 0) {
        const speaker = raw.slice(0, i).trim();
        let rest = raw.slice(i + sepLen).trim();
        const ci = rest.indexOf(":");
        if (ci >= 0) {
            return {
                speaker,
                target: rest.slice(0, ci).trim(),
                action: rest.slice(ci + 1).trim(),
            };
        }
        return { speaker, target: "", action: rest };
    }

    const ci = raw.indexOf(":");
    if (ci >= 0) {
        return {
            speaker: raw.slice(0, ci).trim(),
            target: "",
            action: raw.slice(ci + 1).trim(),
        };
    }
    return { speaker: "", target: "", action: raw };
}

function formatChoiceButtonContent(c) {
    const full = String(c.text || "").trim();
    const { speaker, target, action } = parseChoiceDisplayText(c.text);
    const sysTag = c.system
        ? `<span class="choice-system-tag">[${esc(tSystem(c.system))}]</span>`
        : "";

    const hasMetaParts = speaker || target;
    const hasStructured = hasMetaParts && action;

    if (!hasStructured && full) {
        return `${sysTag ? `${sysTag} ` : ""}<span class="choice-text-plain">${esc(full)}</span>`;
    }

    let inside = "";
    if (speaker) inside += `<span class="choice-speaker">${esc(speaker)}</span>`;
    if (target) {
        inside += `<span class="choice-voice-sep"> → </span><span class="choice-target">${esc(target)}</span>`;
    }
    const meta = inside ? `<span class="choice-voice-meta">(${inside})</span>` : "";

    const metaRow = `<div class="choice-btn-meta-row">${sysTag}${meta}</div>`;
    const actionRow = action
        ? `<div class="choice-btn-action">${esc(action)}</div>`
        : "";
    return metaRow + actionRow;
}

// --- Utils ---
function esc(s) {
    if (!s) return "";
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
}
