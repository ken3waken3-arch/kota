(function () {
  const officialRelations = {
    R18: '自立活動の関連項目例：人間関係の形成(3) 自己の理解と行動の調整。場面の合図や状況理解が課題なら環境の把握(4)、援助要請が中心ならコミュニケーション(5)、予定変更への対応が中心なら心理的な安定(2)も検討。個別の実態から選定する。',
    R19: '自立活動の関連項目例：環境の把握(4) 周囲の状況の把握と状況に応じた行動、人間関係の形成(4) 集団への参加の基礎。確認や役割を尋ねることが中心ならコミュニケーション(5)も検討。暗黙の推測を要求せず、個別の実態から選定する。',
    R20: '自立活動の関連項目例：人間関係の形成(2) 他者の意図や感情の理解、コミュニケーション(5) 状況に応じたコミュニケーション。曖昧な状況への不安が中心なら心理的な安定(2)も検討。相手の気持ちを当てることは求めず、安全と本人の希望から選定する。'
  };

  let relationsChanged = false;
  if (Array.isArray(window.WS_FOUNDATION_CARDS)) {
    window.WS_FOUNDATION_CARDS.forEach((card) => {
      if (officialRelations[card.id] && card.related_items !== officialRelations[card.id]) {
        card.related_items = officialRelations[card.id];
        relationsChanged = true;
      }
    });
  }
  if (typeof DATA !== 'undefined' && Array.isArray(DATA)) {
    DATA.forEach((card) => {
      if (officialRelations[card.id] && card.related_items !== officialRelations[card.id]) {
        card.related_items = officialRelations[card.id];
        relationsChanged = true;
      }
    });
    if (relationsChanged && typeof initCardViews === 'function') initCardViews();
  }

  const savedHost = document.getElementById('ws-saved');
  const savedPanel = savedHost && savedHost.parentElement;

  if (savedPanel) {
    const heading = savedPanel.querySelector('h2');
    const description = savedPanel.querySelector('.section-sub');
    if (heading) heading.textContent = '② 保存済みワークシート（この端末）';
    if (description) {
      description.textContent = '「この端末に保存」を押すと、ここに表示されます。保存先はこの端末のブラウザー内です。他の端末とは同期されません。共有PCでは個人情報を入力しないでください。';
    }
  }

  const originalSaveWorksheet = window.saveWorksheet;
  const originalToast = window.toast;
  if (typeof originalSaveWorksheet === 'function' && typeof originalToast === 'function' && !originalSaveWorksheet.saveLocationAware) {
    const wrappedSaveWorksheet = function () {
      const previousWorksheets = JSON.parse(JSON.stringify(state.worksheets || []));
      let storageFailed = false;
      window.toast = function (message) {
        if (message === 'この端末に保存できません。JSONを書き出してください。') {
          storageFailed = true;
          return;
        }
        if (message === 'ワークシートを保存しました') {
          if (storageFailed) return;
          return originalToast('この端末に保存しました。画面下の「② 保存済みワークシート（この端末）」で確認できます。');
        }
        return originalToast(message);
      };
      try {
        const result = originalSaveWorksheet.apply(this, arguments);
        if (storageFailed) {
          state.worksheets = previousWorksheets;
          renderSavedWorksheets();
          originalToast('端末に保存できませんでした。保存一覧には追加されていません。空き容量を確認してください。');
        }
        return result;
      } finally {
        window.toast = originalToast;
      }
    };
    wrappedSaveWorksheet.saveLocationAware = true;
    window.saveWorksheet = wrappedSaveWorksheet;
  }

  function updateSaveLocation() {
    const button = document.querySelector('#ws-editor [data-act="save-worksheet"]');
    if (!button) return;
    if (button.textContent !== '✓ この端末に保存') button.textContent = '✓ この端末に保存';
    if (document.getElementById('worksheet-save-location')) return;
    const row = button.closest('.actionrow');
    if (!row) return;
    const note = document.createElement('p');
    note.id = 'worksheet-save-location';
    note.className = 'caption space-top';
    note.innerHTML = '<b>保存先：</b>この端末のブラウザー内です。保存後は画面下の「② 保存済みワークシート（この端末）」に表示されます。他の端末とは同期されません。';
    row.insertAdjacentElement('afterend', note);
  }

  function addCurriculumNote() {
    const relatedField = document.getElementById('lesson-edit-related');
    if (!relatedField || document.getElementById('official-curriculum-note')) return;
    const note = document.createElement('p');
    note.id = 'official-curriculum-note';
    note.className = 'caption';
    note.innerHTML = 'この関連項目は候補です。本人の実態、課題同士の関係、本時の目標から、6区分27項目のうち必要な項目を選んで結び付けてください。教科別の検索カテゴリは正式区分と別です。<a href="https://www.mext.go.jp/content/20220426-mext_tokubetu01-100002983_9.pdf" target="_blank" rel="noreferrer">文部科学省の解説</a>';
    relatedField.insertAdjacentElement('afterend', note);
  }

  const badge = document.querySelector('.topflag');
  if (badge) badge.textContent = '教科別支援 v1.7.2 · 教育課程の項目参照を点検';
  updateSaveLocation();
  addCurriculumNote();
  new MutationObserver(() => {
    updateSaveLocation();
    addCurriculumNote();
  }).observe(document.body, { childList: true, subtree: true });
})();
