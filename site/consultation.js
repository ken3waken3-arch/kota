(() => {
  "use strict";

  const SOURCES = [
    {
      name: "プロジェクト元資料：自立活動 支援ナビ v0.9（240カード）・教科書第1〜7巻",
      note: "提供された初期資料です。",
      url: ""
    },
    {
      name: "アプリ内編集資料：統合310カード・教科書第1〜8巻 合本288ページ",
      note: "教科別支援や基礎学習・SSTを含む編集版です。AI相談では310カードから関連する最大4件を照合します。元PDF全文は送信しません。カードは指導検討用の提案で、個々の効果が実証済みという意味ではありません。",
      url: ""
    },
    {
      name: "文部科学省『特別支援学校教育要領・学習指導要領解説 自立活動編』",
      note: "自立活動の目標、実態把握、指導計画、現行の6区分27項目を確認する基礎資料。",
      url: "https://www.mext.go.jp/a_menu/shotou/tokubetu/main/1386427.htm"
    },
    {
      name: "文部科学省『特別支援学校小学部・中学部学習指導要領』総則・各教科",
      note: "教科指導との関連を確認。教科別支援は教科目標に沿って扱い、自立活動の目標と混同しないための参照資料。",
      url: "https://www.mext.go.jp/a_menu/shotou/new-cs/youryou/tokushi/1284527.htm"
    },
    {
      name: "国立特別支援教育総合研究所：通常の学級における多様な教育的ニーズのある子供の教科指導上の配慮に関する研究",
      note: "学習者の視点、つまずきの背景、教科の特性に応じた配慮を考える研究資料（令和3〜4年度）。",
      url: "https://www.nise.go.jp/research/research-1775/"
    },
    {
      name: "国立特別支援教育総合研究所：通常の学級に在籍する子供への個に応じた指導・支援に関する研究",
      note: "令和8年度開始の進行中研究です。最新の検討課題として掲載し、未公表の研究成果を根拠として扱いません。",
      url: "https://www.nise.go.jp/research/research-0802/"
    },
    {
      name: "CAST『Universal Design for Learning Guidelines 3.0』",
      note: "学習への参加、情報提示、表現方法の選択肢を設計するための国際的な枠組み（2024）。日本の学習指導要領そのものではありません。",
      url: "https://udlguidelines.cast.org/"
    },
    {
      name: "IES What Works Clearinghouse：Providing Reading Interventions for Students in Grades 4–9",
      note: "読みの指導に関する米国の実践ガイド（2022）。日本の教科書・学年・言語環境に合わせて慎重に応用します。",
      url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/29"
    },
    {
      name: "IES What Works Clearinghouse：Assisting Students Struggling with Mathematics: Intervention in the Elementary Grades",
      note: "算数・数学の支援に関する米国の実践ガイド（2021）。具体物・図・数直線等の参考として扱います。",
      url: "https://ies.ed.gov/ncee/wwc/PracticeGuide/26/WhatWeDo"
    },
    {
      name: "文部科学省：次期学習指導要領等に向けた審議資料（2026年）",
      note: "検討中の資料です。告示・施行前の案を現行の基準として扱わず、正式な改訂を別途確認します。",
      url: "https://www.mext.go.jp/content/20261020-mxt-soseisk01-000052565-02-1.pdf"
    },
    {
      name: "プロジェクト提供資料：『通級指導教室と特別支援教室の指導のアイデア』（小学校編／中学校・高等学校編）",
      note: "教室での支援事例を検討するための参照資料です。カードの文章・活動例は編集しています。",
      url: ""
    },
    {
      name: "プロジェクト提供資料：『教室で使えるコグトレ／特別支援教育のアイデア』（小学校編／中学校・高等学校編）",
      note: "認知・身体・対人関係の支援を検討するための参照資料です。原書の本文・ワークシート・図版をそのまま転載しません。",
      url: ""
    }
  ];

  const css = `
    .consult-nav{width:100%;display:flex;align-items:center;gap:12px;border:0;background:transparent;color:#41575e;text-align:left;padding:13px 15px;border-radius:12px;font-weight:800;font:inherit;cursor:pointer}
    .consult-nav:hover{background:#e4f4ef;color:#0b4f4c}
    .consult-nav-icon{font-size:19px;width:26px;text-align:center}
    #consult-dialog{width:min(760px,calc(100vw - 24px));max-height:min(90vh,900px);padding:0;border:1px solid #dce5df;border-radius:18px;color:#142c35;box-shadow:0 24px 80px #0d252966}
    #consult-dialog::backdrop{background:#132d33a6;backdrop-filter:blur(2px)}
    .consult-head{position:sticky;top:0;z-index:1;background:#fffefa;padding:18px 20px 12px;border-bottom:1px solid #dce5df;display:flex;justify-content:space-between;gap:12px;align-items:center}
    .consult-head h2{font-size:20px;margin:0;color:#142c35}
    .consult-close{border:1px solid #dce5df;background:white;border-radius:10px;padding:8px 12px;color:#41575e;font:inherit;font-weight:700}
    .consult-body{padding:18px 20px 22px;overflow:auto}
    .consult-privacy{border:1px solid #efdcbc;background:#fff8ea;color:#765b32;border-radius:12px;padding:12px 14px;font-size:13px;line-height:1.65;margin:0 0 16px}
    .consult-mode{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:13px}
    .consult-mode button{border:1px solid #cadcd4;border-radius:10px;background:#fff;padding:9px 12px;color:#31544e;font:inherit;font-weight:750}
    .consult-mode button[aria-pressed="true"]{background:#116d65;color:white;border-color:#116d65}
    .consult-label{display:block;font-size:14px;font-weight:800;margin:12px 0 6px}
    #consult-question{width:100%;min-height:116px;resize:vertical;border:1px solid #cadcd4;border-radius:11px;padding:12px;font:inherit;line-height:1.65;color:#142c35}
    #consult-question:focus{outline:3px solid #116d6538;border-color:#116d65}
    .consult-hint{font-size:12px;color:#60717a;margin:6px 0 12px}
    .consult-consent{display:flex;align-items:flex-start;gap:9px;font-size:13px;line-height:1.55;color:#43575d;margin:13px 0}
    .consult-consent input{width:19px;height:19px;flex:none;margin:2px 0 0;accent-color:#116d65}
    .consult-submit{border:1px solid #116d65;border-radius:11px;background:#116d65;color:white;padding:11px 16px;font:inherit;font-weight:800}
    .consult-submit:disabled{opacity:.5;cursor:not-allowed}
    .consult-status{font-size:13px;color:#60717a;margin:10px 0 0;min-height:1.5em}
    .consult-answer{white-space:pre-wrap;line-height:1.8;background:#f5f9f6;border:1px solid #dce5df;border-radius:12px;padding:16px;margin:16px 0 0;color:#142c35;overflow-wrap:anywhere}
    .consult-citations{font-size:12px;color:#53686d;margin:10px 0 0;line-height:1.7}
    .consult-citations a,.source-item a{color:#0a665f;text-decoration:underline;text-underline-offset:2px}
    .consult-offline{font-size:12px;color:#60717a;margin:8px 0}
    .source-list .source-item{line-height:1.7}
    .source-update-date{font-size:12px;color:#60717a;margin:-7px 0 14px}
    @media(max-width:620px){#consult-dialog{width:calc(100vw - 14px);max-height:94vh}.consult-head,.consult-body{padding-left:14px;padding-right:14px}}
  `;
  document.head.insertAdjacentHTML("beforeend", `<style>${css}</style>`);

  const legacyAiWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let legacyAiText;
  while ((legacyAiText = legacyAiWalker.nextNode())) {
    if (legacyAiText.nodeValue.includes("生成AIではなく")) {
      legacyAiText.nodeValue = "310カード検索は登録済みの内容を提示します。AI相談では質問と関連カードを送信して具体案を作ります。個人情報は入力しないでください。";
      break;
    }
  }

  const sourceList = document.querySelector(".source-list");
  const topFlag = document.querySelector(".topflag");
  if (topFlag) topFlag.textContent = "支援カード310件 · 出典更新・AI相談 v1.8.3";
  if (sourceList) {
    sourceList.innerHTML = `<p class="source-update-date">出典・編集方針を2026年11月27日に確認。現行資料と検討中資料を区別しています。</p>${SOURCES.map((s) => `<div class="source-item"><strong>${escapeHtml(s.name)}</strong><p>${escapeHtml(s.note)}${s.url ? ` <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">公式資料を開く</a>` : ""}</p></div>`).join("")}`;
    const about = sourceList.closest(".panel");
    if (about) {
      const h = about.querySelector(".section-title");
      if (h) h.textContent = "出典・参考資料と編集方針";
    }
  }

  updateFeatureSummary();

  function updateFeatureSummary() {
    const about = document.getElementById("view-about");
    if (!about) return;
    const stages = [...about.querySelectorAll(".detail-stage")];
    const featureStage = stages.find((stage) => stage.querySelector("h4")?.textContent.includes("この増補版でできること"));
    if (featureStage) {
      featureStage.querySelector("h4").textContent = "この増補版でできること（v1.8.3）";
      const list = featureStage.querySelector("ul");
      if (list) list.innerHTML = [
        "310件の支援カードを場面・教科から検索し、関連する自立活動の項目を確認する",
        "AIに相談し、関連カードをもとに支援案・15〜20分の指導例・具体的なワークシート案を作る（オンライン時）",
        "AIの回答で照合したアプリ内カードと出典を確認する",
        "支援プランを作成し、印刷・コピー・テキスト出力する",
        "児童生徒用A4ワークシートを8形式で作成、編集・保存・印刷する",
        "15・20・45・50分の指導計画を作成・編集・保存・印刷する",
        "実践記録をこの端末に保存し、JSON形式でバックアップする",
        "一度読み込んだ支援カード検索をオフラインで利用する"
      ].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }
    const unavailableStage = stages.find((stage) => stage.querySelector("h4")?.textContent.trim() === "まだできないこと");
    if (unavailableStage) {
      const list = unavailableStage.querySelector("ul");
      if (list) list.innerHTML = [
        "外部の論文・ウェブを自動検索して最新情報を追加すること",
        "実施効果の因果推定や心理・医学的な診断",
        "複数端末・校内クラウドへの保存内容の同期",
        "教材イラストの自動生成やアカウント管理"
      ].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    }
  }

  const navLinks = document.querySelector(".nav-links");
  if (navLinks) {
    const navButton = document.createElement("button");
    navButton.type = "button";
    navButton.className = "consult-nav";
    navButton.innerHTML = `<span class="consult-nav-icon" aria-hidden="true">✦</span><span>AIに相談</span>`;
    navButton.addEventListener("click", openDialog);
    navLinks.appendChild(navButton);
  }

  document.body.insertAdjacentHTML("beforeend", `
    <dialog id="consult-dialog" aria-labelledby="consult-title">
      <div class="consult-head"><h2 id="consult-title">支援の相談・ワークシート案</h2><button class="consult-close" type="button" data-consult-close>閉じる</button></div>
      <div class="consult-body">
        <p class="consult-privacy"><strong>送信内容について</strong><br>質問文と、310件の支援カードから照合した最大4件がCloudflareのAIに送信され、回答作成に使われます。アプリは相談内容を保存せず、元資料PDF全文や外部検索結果は送信しません。児童生徒の氏名、学校名、住所、診断名、個人が推測できる記述は入力しないでください。</p>
        <div class="consult-mode" role="group" aria-label="相談内容">
          <button type="button" data-consult-mode="support" aria-pressed="true">支援を相談</button>
          <button type="button" data-consult-mode="worksheet" aria-pressed="false">ワークシート案</button>
        </div>
        <label class="consult-label" for="consult-question">困っている場面や作りたい教材</label>
        <textarea id="consult-question" maxlength="1500" placeholder="例：小学算数で一桁の足し算はできるが、繰り上がりで混乱します。15分の練習と、答え付きの簡単なワークシート案をください。"></textarea>
        <p class="consult-hint">学年・教科・できていること・困る場面を短く書くと、具体的な案になります。名前などは書かないでください。</p>
        <label class="consult-consent"><input type="checkbox" id="consult-anonymous"><span>個人を特定できる情報を含めていないことを確認しました。質問と関連カードがAIに送信されます。</span></label>
        <button type="button" id="consult-send" class="consult-submit" disabled>相談する</button>
        <p id="consult-status" class="consult-status" role="status" aria-live="polite">AI相談にはインターネット接続が必要です。オフラインではカード検索・ワークシート作成を利用してください。</p>
        <div id="consult-answer" class="consult-answer" hidden></div>
        <div id="consult-citations" class="consult-citations" hidden></div>
      </div>
    </dialog>
  `);

  const dialog = document.getElementById("consult-dialog");
  const question = document.getElementById("consult-question");
  const consent = document.getElementById("consult-anonymous");
  const send = document.getElementById("consult-send");
  const status = document.getElementById("consult-status");
  const answer = document.getElementById("consult-answer");
  const citations = document.getElementById("consult-citations");
  let mode = "support";
  let apiReady = null;

  document.querySelector("[data-consult-close]").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener("click", (event) => {
    if (!event.target.closest("[data-consult-about]")) return;
    event.preventDefault();
    dialog.close();
    document.querySelector('.nav-btn[data-nav="about"]')?.click();
  });
  consent.addEventListener("change", updateSend);
  question.addEventListener("input", updateSend);
  document.querySelectorAll("[data-consult-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      mode = button.dataset.consultMode;
      document.querySelectorAll("[data-consult-mode]").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    });
  });
  send.addEventListener("click", submitQuestion);

  function openDialog() {
    if (!dialog.open) dialog.showModal();
    question.focus();
    checkApi();
  }

  function updateSend() {
    send.disabled = !consent.checked || !question.value.trim() || question.value.trim().length > 1500 || apiReady === false;
  }

  async function checkApi() {
    status.textContent = "AI相談の接続を確認しています…";
    try {
      const response = await fetch("./api/consult?status=1", { cache: "no-store" });
      const data = await response.json();
      apiReady = response.ok && data.ready === true;
      status.textContent = apiReady
        ? "接続できます。質問を短くまとめて送信してください。"
        : "AI接続の設定がまだ完了していません。管理者はCloudflare Pagesの設定でWorkers AIバインディング名を「AI」にして再デプロイしてください。通常のカード検索・ワークシートは使えます。";
    } catch (_) {
      apiReady = false;
      status.textContent = "AI相談にはオンライン接続が必要です。現在は接続できません。";
    }
  }

  async function submitQuestion() {
    const text = question.value.trim();
    if (!consent.checked || !text || send.disabled) return;
    send.disabled = true;
    answer.hidden = true;
    citations.hidden = true;
    status.textContent = "プロジェクト内の支援カードを照合して回答を作っています…";
    const evidence = findRelevantCards(text, mode);
    try {
      const response = await fetch("./api/consult", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text, mode, evidence })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.message || (response.status === 429 ? "相談が集中しています。1分ほど待ってからお試しください。" : "AIの応答を受け取れませんでした。"));
      }
      answer.textContent = data.answer || "回答を作成できませんでした。質問を短くして再度お試しください。";
      answer.hidden = false;
      citations.innerHTML = citationHtml(evidence);
      citations.hidden = false;
      status.textContent = "回答案です。本人の様子・学校の計画・安全面に照らして調整してください。";
    } catch (error) {
      status.textContent = error.message || "通信に失敗しました。接続を確認してください。";
    } finally {
      send.disabled = false;
      updateSend();
    }
  }

  function findRelevantCards(query, currentMode) {
    const data = extractCards();
    if (!data.length) return [];
    const q = normalize(query);
    const terms = new Set(tokenize(query));
    const scored = data.map((card) => {
      const searchable = normalize([
        card.title, card.area, card.subject, ...(card.keywords || []), card.scene,
        ...(card.checks || []), ...(card.helps || []), card.goal, ...(card.lesson || []),
        ...(card.measure || []), ...(card.avoid || []), card.words
      ].filter(Boolean).join(" "));
      let score = 0;
      if (q.length > 3 && searchable.includes(q)) score += 12;
      for (const term of terms) if (term.length > 1 && searchable.includes(term)) score += Math.min(term.length, 5);
      if (currentMode === "worksheet" && /ワークシート|プリント|教材|穴埋め/.test(normalize(card.title + " " + (card.keywords || []).join(" ")))) score += 1;
      if (card.subject && query.includes(card.subject)) score += 5;
      return { card, score };
    }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).slice(0, 4);
    return scored.map(({ card }) => ({
      id: String(card.id || "").slice(0, 30), title: String(card.title || "").slice(0, 120),
      area: String(card.area || "").slice(0, 40), subject: String(card.subject || "").slice(0, 30),
      scene: String(card.scene || "").slice(0, 700), checks: shortArray(card.checks), helps: shortArray(card.helps),
      goal: String(card.goal || "").slice(0, 450), lesson: shortArray(card.lesson, 5),
      measure: shortArray(card.measure), avoid: shortArray(card.avoid), words: String(card.words || "").slice(0, 180),
      source: String(card.source || "").slice(0, 350), related_items: String(card.related_items || "").slice(0, 180),
      book_page: card.book_page !== null && card.book_page !== undefined && Number.isFinite(Number(card.book_page)) ? Number(card.book_page) : null
    }));
  }

  function extractCards() {
    try {
      const scriptText = [...document.scripts].find((script) => script.textContent.includes("let DATA"))?.textContent;
      if (!scriptText) return [];
      const match = scriptText.match(/\blet DATA\s*=\s*/);
      if (!match) return [];
      const start = match.index + match[0].length;
      const open = scriptText.indexOf("[", start);
      let depth = 0, inString = false, escaped = false;
      for (let i = open; i < scriptText.length; i++) {
        const char = scriptText[i];
        if (inString) {
          if (escaped) escaped = false;
          else if (char === "\\") escaped = true;
          else if (char === '"') inString = false;
        } else if (char === '"') inString = true;
        else if (char === "[") depth++;
        else if (char === "]" && --depth === 0) return JSON.parse(scriptText.slice(open, i + 1));
      }
    } catch (_) {}
    return [];
  }

  function citationHtml(cards) {
    const cardText = cards.length
      ? `<strong>照合したアプリ内カード</strong><br>${cards.map((c) => `${escapeHtml(c.id)}「${escapeHtml(c.title)}」— ${escapeHtml(c.source || "出典記載なし")}`).join("<br>")}`
      : "関連する支援カードを十分に特定できませんでした。一般的な提案として扱ってください。";
    return `${cardText}<br><a href="#" data-consult-about>出典・参考資料を見る</a>`;
  }

  function normalize(value) { return String(value || "").toLowerCase().replace(/[\s　、。，．・「」『』（）()［］【】!?！？:：;；/／\\]+/g, ""); }
  function tokenize(value) {
    const raw = String(value || "").toLowerCase().match(/[a-z0-9]+|[\u3040-\u30ff\u3400-\u9fff]{2,}/g) || [];
    const out = new Set(raw);
    for (const token of raw) {
      const chars = [...token];
      if (chars.length > 5) for (let i = 0; i < chars.length - 1; i++) out.add(chars.slice(i, i + 2).join(""));
    }
    return out;
  }
  function shortArray(value, limit = 4) { return Array.isArray(value) ? value.slice(0, limit).map((x) => String(x).slice(0, 250)) : []; }
  function escapeHtml(value) { return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]); }
})();
